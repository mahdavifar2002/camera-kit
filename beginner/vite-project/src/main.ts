import { bootstrapCameraKit } from "@snap/camera-kit"

(async function() {
  const cameraKit = await bootstrapCameraKit({
    apiToken: "eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzE1NTk4Mzk4LCJzdWIiOiI4MTk0MmI3Zi0xMDNhLTQ2OGUtOTQwNC1kNTcxMGQxM2NjOTl-U1RBR0lOR35iNTZjNWE2Zi1mZDAwLTRkMjMtYjI3Ni1jODZhMzg5ZDU2NWUifQ.1keEzLpu6Kr_mefm8i7H_Rqhgt_edoAqtXWmnDd7ANs",
  });

  const liveRenderTarget = document.getElementById("canvas") as HTMLCanvasElement;

  const session = await cameraKit.createSession({ liveRenderTarget });

  const mediaSteam = await navigator.mediaDevices.getUserMedia({
    video: {
      facingMode: 'user'
    },
  });

  await session.setSource(mediaSteam);

  await session.play();

  const lens = await cameraKit.lensRepository.loadLens(
    // "39432910922",
    // "33bca480-6e43-423e-a729-459a819ad784"
    // "727e7687-a3f5-4761-bfee-unda42ade59",
    // "86605285-90b4-44e6-bb3e-c33009e2704b"
    "978bad99-3b8c-45f1-8711-8c8528ead8f1",
    "7c697050-fade-4e3e-987e-ab838a913c17"
  );
  
  await session.applyLens(lens);
})();