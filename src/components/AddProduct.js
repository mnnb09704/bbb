import React, { useState } from 'react';
import { db, storage } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

function AddProduct() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState(10); // স্টকের সংখ্যা
  const [features, setFeatures] = useState(''); // কমা দিয়ে ফিচার
  const [isBundle, setIsBundle] = useState(false); // এটি বান্ডেল ডিল কিনা
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      alert("Please upload an image.");
      return;
    }
    setLoading(true);

    try {
      // 1. ছবি Firebase Storage-এ আপলোড
      const storageRef = ref(storage, `products/${Date.now()}_${image.name}`);
      const snapshot = await uploadBytes(storageRef, image);
      const downloadURL = await getDownloadURL(snapshot.ref);

      // 2. পণ্যের তথ্য Firestore-এ সেভ
      await addDoc(collection(db, 'products'), {
        name,
        price: Number(price),
        description,
        stock: Number(stock),
        features: features.split(',').map(f => f.trim()), // কমা থেকে অ্যারে
        isBundle,
        imageUrl: downloadURL,
        createdAt: new Date(),
      });
      alert('Product added successfully!');
      // ফরম রিসেট করুন
      setName(''); setPrice(''); setDescription(''); setStock(10); 
      setFeatures(''); setIsBundle(false); setImage(null);
    } catch (error) {
      console.error("Error adding document: ", error);
      alert('Failed to add product.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Product Name" required />
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Product Price" required />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Product Description" required />
        <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} placeholder="Stock Quantity" required />
        <input type="text" value={features} onChange={(e) => setFeatures(e.target.value)} placeholder="Features (comma separated)" />
        <div className="checkbox-container">
          <label htmlFor="isBundle">Is this a Bundle Deal?</label>
          <input type="checkbox" id="isBundle" checked={isBundle} onChange={(e) => setIsBundle(e.target.checked)} />
        </div>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} required />
        <button type="submit" disabled={loading}>{loading ? 'Uploading...' : 'Add Product'}</button>
      </form>
    </div>
  );
}

export default AddProduct;