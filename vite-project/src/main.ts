import { bootstrapCameraKit, createMediaStreamSource, Transform2D } from "@snap/camera-kit"

(async function() {
  const url = document.location.search;
  const urlParams = new URLSearchParams(url);

  const lensId = urlParams.get("id");
  const groupId = urlParams.get("group");
  const cameraMode = urlParams.get("camera") || "front";
  const proxy = urlParams.get("proxy") || "false";

  // Setting proxy server
  if (proxy == "true") {
    window.fetch = new Proxy(window.fetch, {
      apply: function (target, thisArg, args) {
        const baseUrl = `https://free-net.tech:8081/`;

        const url = args[0] instanceof Request ? args[0].url : args[0];

        if (!url.toString().includes(baseUrl)) {
          const fullUrl = baseUrl + url;
          args = [fullUrl, ...args.slice(1)];
        }

        // Forward function call to the original fetch with the updated URL
        const result = Reflect.apply(target, thisArg, args);

        return result;
      }
    });
  }

  // Bootstrapping Camera Kit
  const cameraKit = await bootstrapCameraKit({
    apiToken: "eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzE1NTk4Mzk4LCJzdWIiOiI4MTk0MmI3Zi0xMDNhLTQ2OGUtOTQwNC1kNTcxMGQxM2NjOTl-U1RBR0lOR35iNTZjNWE2Zi1mZDAwLTRkMjMtYjI3Ni1jODZhMzg5ZDU2NWUifQ.1keEzLpu6Kr_mefm8i7H_Rqhgt_edoAqtXWmnDd7ANs",
  });

  const liveRenderTarget = document.getElementById("canvas") as HTMLCanvasElement;

  const session = await cameraKit.createSession({ liveRenderTarget });

  var mediaStream = await navigator.mediaDevices.getUserMedia({
    video: {
      facingMode: cameraMode == "front" ? "user" : "environment"
    },
  });

  const source = createMediaStreamSource(mediaStream);

  await session.setSource(source);

  if (cameraMode == "front")
    source.setTransform(Transform2D.MirrorX);

  const lens = await cameraKit.lensRepository.loadLens(
    lensId || "978bad99-3b8c-45f1-8711-8c8528ead8f1",
    groupId || "a980ecf0-7365-450f-9713-ba0669851852",
  );

  document.title = lens.name;

  await session.applyLens(lens);

  await session.play();

  document.getElementById("spinner")?.setAttribute("style", "display: none;");
  liveRenderTarget.classList.remove("loading");
})();