import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

function normalizeRecord(record, index) {
  const fields = record.fields || record;

  const attachment =
    fields.Attachments?.[0] ||
    fields.attachments?.[0] ||
    fields.Image?.[0] ||
    fields.image?.[0] ||
    fields.Photo?.[0] ||
    fields.photo?.[0] ||
    fields.Picture?.[0] ||
    fields.picture?.[0] ||
    fields['Device Image']?.[0] ||
    fields['device image']?.[0] ||
    null;

  return {
    id: record.id || fields.id || String(index + 1),
    device_name: fields.device_name || fields['Device Name'] || 'Untitled device',
    model_name: fields.model_name || fields['Exact Model Name'] || '',
    manufacturer: fields.manufacturer || '',
    category: fields.category || '',
    description: fields.description || fields['Device Description'] || '',
    technical_specifications: fields.technical_specifications || fields.Specifications || '',
    fda_classification_name: fields.fda_classification_name || fields['FDA Classification name'] || '',
    product_code: fields.product_code || fields['Product Code'] || '',
    regulation_number: fields.regulation_number || fields['Regulation Number'] || '',
    k_number: fields.k_number || fields['510(k) Number'] || '',
    fda_source_link: fields.fda_source_link || fields['FDA Source Link'] || '',
    attachment_links: fields.attachment_links || fields.Attachments || '',
    problem_ar: fields.problem_ar || fields['ما المشكلة التي يحلها الجهاز أو ما الهدف منه؟ (What problem does it solve / What is it for?)'] || '',
    history_ar: fields.history_ar || fields['تاريخ الجهاز ولماذا تم اختراعه؟ (Device history and why it was invented)'] || '',
    components_ar: fields.components_ar || fields['تفصيل كل جزء/مكون من الجهاز وكيف يعمل ويتفاعل مع جسم الإنسان (Breakdown of each component and how it works/interacts with human body)'] || '',
    common_problems_maintenance_ar: fields.common_problems_maintenance_ar || fields['المشاكل الشائعة ومتطلبات الصيانة (Common problems & maintenance requirements)'] || '',
    checkup_frequency_ar: fields.checkup_frequency_ar || fields['عدد مرات الفحص المطلوب للجهاز (How often does the device need check-ups)'] || '',
    safety_notes_ar: fields.safety_notes_ar || fields['ملاحظات السلامة (Safety notes)'] || '',

    image_url: attachment?.url || fields.image_url || fields['Image URL'] || fields['image_url'] || '',
    attachment_type: attachment?.type || '',
    attachment_name: attachment?.filename || '',
  };
}

async function getFromAirtable() {
  const token = process.env.AIRTABLE_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableName = process.env.AIRTABLE_TABLE_NAME || 'Medical Devices';

  if (!token || !baseId) return null;

  const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: 300 },
  });

  if (!res.ok) throw new Error(`Airtable error: ${res.status}`);

  const data = await res.json();
  return data.records.map(normalizeRecord);
}

function getFromCsv() {
  const filePath = path.join(process.cwd(), 'data', 'devices.csv');
  const csv = fs.readFileSync(filePath, 'utf8');
  const parsed = Papa.parse(csv, { header: true, skipEmptyLines: true });
  return parsed.data.map(normalizeRecord);
}

export async function getDevices() {
  try {
    const airtable = await getFromAirtable();
    if (airtable) return airtable;
  } catch (error) {
    console.error(error);
    throw error;
  }

  return getFromCsv();
}


export async function getDeviceById(id) {
  const devices = await getDevices();
  return devices.find((d) => String(d.id) === String(id));
}