import { bootstrapCameraKit, createMediaStreamSource, Transform2D } from "@snap/camera-kit"

(async function() {
  const cameraKit = await bootstrapCameraKit({
    apiToken: "eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzE1NTk4Mzk4LCJzdWIiOiI4MTk0MmI3Zi0xMDNhLTQ2OGUtOTQwNC1kNTcxMGQxM2NjOTl-U1RBR0lOR35iNTZjNWE2Zi1mZDAwLTRkMjMtYjI3Ni1jODZhMzg5ZDU2NWUifQ.1keEzLpu6Kr_mefm8i7H_Rqhgt_edoAqtXWmnDd7ANs",
  });

  const liveRenderTarget = document.getElementById("canvas") as HTMLCanvasElement;
  const cameraMode = liveRenderTarget.getAttribute("camera") || "front";

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

  await session.play();

  const lensId = liveRenderTarget.getAttribute("lensId");
  const groupId = liveRenderTarget.getAttribute("groupId");

  const lens = await cameraKit.lensRepository.loadLens(
    lensId ? lensId : "",
    groupId ? groupId : "",
  );
  
  await session.applyLens(lens);
})();