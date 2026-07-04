import Link from 'next/link';
import { getDeviceById, getDevices } from '../../../lib/devices';

export async function generateStaticParams() {
  const devices = await getDevices();
  return devices.map((d) => ({ id: String(d.id) }));
}

function Section({ title, children, rtl = false }) {
  if (!children) return null;
  return (
    <section className="detailSection" dir={rtl ? 'rtl' : 'ltr'}>
      <h2>{title}</h2>
      <div className="textBlock">
        {String(children).split('\n').map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>
    </section>
  );
}

export default async function DevicePage({ params }) {
  const { id } = await params;
  const device = await getDeviceById(id);

  if (!device) return <main><p>Device not found.</p></main>;

  return (
    <main>
      <Link href="/" className="back">← Back to devices</Link>

      <div className="detailHero">
        {device.image_url ? (
          <img src={device.image_url} alt={device.device_name} />
        ) : (
          <div className="imagePlaceholder big">Device Image</div>
        )}

        <div>
          <p className="eyebrow">{device.category}</p>
          <h1>{device.device_name}</h1>
          <p className="subtitle">{device.model_name}</p>
          <p>{device.manufacturer}</p>
        </div>
      </div>

      <section className="facts">
        <div><b>FDA Classification</b><span>{device.fda_classification_name}</span></div>
        <div><b>Product Code</b><span>{device.product_code}</span></div>
        <div><b>Regulation Number</b><span>{device.regulation_number}</span></div>
        <div><b>510(k)</b><span>{device.k_number}</span></div>
      </section>

      <Section title="Description">{device.description}</Section>
      <Section title="Technical Specifications">{device.technical_specifications}</Section>
      <Section title="ما المشكلة التي يحلها الجهاز؟" rtl>{device.problem_ar}</Section>
      <Section title="تاريخ الجهاز" rtl>{device.history_ar}</Section>
      <Section title="المكونات وكيف يعمل الجهاز" rtl>{device.components_ar}</Section>
      <Section title="المشاكل الشائعة والصيانة" rtl>{device.common_problems_maintenance_ar}</Section>
      <Section title="عدد مرات الفحص المطلوب" rtl>{device.checkup_frequency_ar}</Section>
      <Section title="ملاحظات السلامة" rtl>{device.safety_notes_ar}</Section>

      {device.fda_source_link && (
        <a className="source" href={device.fda_source_link} target="_blank">
          FDA Source
        </a>
      )}
    </main>
  );
}