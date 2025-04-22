import { useState } from "react";

export const QrCode = () => {
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrData, setQrData] = useState("");
  const [qrSize, setQrSize] = useState("200");

  async function generateQR() {
    if (!qrData.trim()) return;
    if (!qrSize || isNaN(qrSize)) return;

    setLoading(true);
    try {
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`;
      setImg(url);
    } catch (error) {
      console.error("Error generating QR code", error);
    } finally {
      setLoading(false);
    }
  }

  function downloadQr() {
    if (!img) return;
    
    const link = document.createElement("a");
    link.href = img;
    link.download = `qrcode-${qrData.substring(0, 15)}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="app-container">
      <div className="card">
        <h1>QR Code Generator</h1>
        <p className="subtitle">Create custom QR codes in seconds</p>
        
        {img && <img src={img} className="qr-code-image" alt="Generated QR Code" />}

        <div className="form-group">
          <label className="input-label">Enter text or URL</label>
          <input
            type="text"
            value={qrData}
            onChange={(e) => setQrData(e.target.value)}
            placeholder="https://example.com"
          />
        </div>

        <div className="form-group">
          <label className="input-label">Image size (100-500px)</label>
          <input
            type="number"
            value={qrSize}
            onChange={(e) => setQrSize(e.target.value)}
            min="100"
            max="500"
            placeholder="200"
          />
        </div>

        <div className="button-group">
          <button
            onClick={generateQR}
            disabled={loading || !qrData}
            className="primary-button"
          >
            {loading ? "Generating..." : "Generate QR Code"}
          </button>
          <button
            onClick={downloadQr}
            disabled={!img}
            className="secondary-button"
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
};