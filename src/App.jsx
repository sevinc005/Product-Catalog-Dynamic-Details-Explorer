import { Routes, Route, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import ProductDetail from './pages/ProductDetail'; 
const fetchProducts = async () => {
  const res = await axios.get('https://dummyjson.com/products');
  return res.data.products;
};
function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });
  if (isLoading) return <div className="flex justify-center items-center h-screen font-bold text-blue-600">Məhsullar yüklənir...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500 font-bold">Xəta baş verdi!</div>;
  const filteredProducts = products?.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={
          <main className="max-w-7xl mx-auto py-10 px-4">
            <h2 className="text-3xl font-black text-gray-900 mb-8">Kataloq</h2>
            
            {/* Filtrləmə Paneli */}
            <div className="flex flex-col md:flex-row gap-4 mb-10 bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
              <input 
                type="text" 
                placeholder="Məhsulun adını yazın..." 
                className="flex-1 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select 
                className="p-3 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">Bütün Kateqoriyalar</option>
                <option value="smartphones">Telefonlar</option>
                <option value="laptops">Noutbuklar</option>
                <option value="fragrances">Ətirlər</option>
                <option value="skincare">Dəri qulluğu</option>
                <option value="groceries">Qida</option>
              </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {filteredProducts?.length > 0 ? (
                filteredProducts.map((product) => (
                  <Link to={`/product/${product.id}`} key={product.id} className="group">
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-50 hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                      <div className="relative overflow-hidden rounded-xl mb-4 h-48 bg-gray-100">
                        <img 
                          src={product.thumbnail} 
                          alt={product.title} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                        />
                        <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-lg text-xs font-bold shadow-sm">
                          ★ {product.rating}
                        </div>
                      </div>
                      <h3 className="font-bold text-gray-800 text-lg mb-1 truncate">{product.title}</h3>
                      <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">{product.description}</p>
                      <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-50">
                        <span className="text-xl font-black text-blue-600">${product.price}</span>
                        <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-md font-semibold">Detallı bax</span>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="col-span-full text-center py-20 text-gray-400">Axtarışa uyğun məhsul tapılmadı.</div>
              )}
            </div>
          </main>
        } />

        {/* TƏFƏRRÜAT SƏHİFƏSİ */}
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </div>
  );
}

export default App;