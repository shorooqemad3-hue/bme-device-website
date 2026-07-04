import Link from 'next/link';
import { getDevices } from '../lib/devices';

export default async function Home() {
  const devices = await getDevices();
  const categories = [...new Set(devices.map((d) => d.category).filter(Boolean))];

  return (
    <main>
      <section className="hero">
        <p className="eyebrow">Biomedical Engineering</p>
        <h1>Biomedical Device Library</h1>
        <p className="subtitle">Arabic and English device knowledge base for biomedical engineering students.</p>
        <input className="search" placeholder="Search device, company, category..." />
      </section>

      <section className="section">
        <h2>Categories</h2>
        <div className="chips">
          {categories.map((category) => (
            <span key={category} className="chip">{category}</span>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Medical Devices</h2>
        <div className="grid">
          {devices.map((device) => (
            <Link className="card" key={device.id} href={`/device/${device.id}`}>
              {device.image_url ? (
                device.attachment_type?.includes("pdf") ||
                device.attachment_name?.toLowerCase().endsWith(".pdf") ? (
                  <div className="imagePlaceholder">
                    <div style={{ fontSize: "40px" }}>📄</div>
                    <span>PDF</span>
                  </div>
                ) : (
                  <img src={device.image_url} alt={device.device_name} />
                )
              ) : (
                <div className="imagePlaceholder">Device Image</div>
              )}

              <div className="cardBody">
                <h3>{device.device_name}</h3>
                <p>{device.manufacturer || device.model_name}</p>
                <span>{device.category}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}