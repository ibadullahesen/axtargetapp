// src/lib/cloudinary.ts
export const CLOUDINARY_CLOUD_NAME = "duledfjrg";  // BURANI SONRA DƏYİŞƏCƏYİK (sənin cloudinary cloud_name)
export const CLOUDINARY_UPLOAD_PRESET = "AxtarGet";

export const uploadToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  formData.append("folder", "axtarget");

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();
  if (!res.ok) throw new Error("Şəkil yüklənmədi");
  return data.secure_url;
};
