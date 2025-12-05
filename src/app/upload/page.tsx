"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { uploadToCloudinary } from "@/lib/cloudinary";
import Image from "next/image";

export default function Upload() {
  const { user, profile } = useAuth();
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleSubmit = async () => {
    if (!file || !user) return;

    setUploading(true);
    try {
      const imageUrl = await uploadToCloudinary(file);

      await addDoc(collection(db, "posts"), {
        uid: user.uid,
        username: profile?.username || user.email?.split("@")[0],
        imageUrl,
        description,
        status: false, // admin təsdiqini gözləyir
        likes: 0,
        bookmarks: 0,
        createdAt: serverTimestamp(),
      });

      setSuccess(true);
      setTimeout(() => router.push("/"), 3000);
    } catch (err) {
      alert("Xəta baş verdi");
    }
    setUploading(false);
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-10 rounded-2xl shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Paylaşım göndərildi!</h2>
          <p className="text-gray-600">
            Paylaşımınız 5–15 dəqiqə ərzində yoxlanılıb paylaşılacaqdır.
          </p>
          <button
            onClick={() => router.push("/")}
            className="mt-6 btn-primary"
          >
            Ana səhifəyə dön
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-20">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-center mb-6">Yeni paylaşım</h2>

          {!preview ? (
            <label className="block cursor-pointer">
              <div className="border-2 border-dashed border-gray-300 rounded-xl h-96 flex items-center justify-center hover:border-black transition">
                <p className="text-gray-500 text-center">
                  Şəkil seçmək üçün klikləyin
                </p>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          ) : (
            <div className="relative aspect-square mb-6">
              <Image src={preview} alt="Preview" fill className="object-cover rounded-xl" />
            </div>
          )}

          <textarea
            placeholder="Açıqlama əlavə et (isteğe bağlı)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-4 border rounded-lg resize-none h-32 focus:outline-none focus:border-black"
          />

          <div className="flex gap-3 mt-6">
            <button
              onClick={() => router.back()}
              className="flex-1 py-3 border border-gray-300 rounded-lg font-medium"
            >
              Ləğv et
            </button>
            <button
              onClick={handleSubmit}
              disabled={!file || uploading}
              className="flex-1 btn-primary disabled:opacity-50"
            >
              {uploading ? "Yüklənir..." : "Paylaş"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
