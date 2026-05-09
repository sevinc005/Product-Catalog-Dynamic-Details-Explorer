import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
const fetchSingleProduct = async (id) => {
  const res = await axios.get(`https://dummyjson.com/products/${id}`);
  return res.data;
};
const ProductDetail = () => {
  const { id } = useParams(); 

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchSingleProduct(id),
  });

  if (isLoading) return <div className="p-20 text-center font-bold text-blue-600">Məhsul məlumatları yüklənir...</div>;
  if (error) return <div className="p-20 text-center text-red-500 font-bold">Məhsul tapılmadı!</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
    <div className="max-w-6xl mx-auto">
        <Link to="/" className="inline-flex items-center text-blue-600 font-medium mb-8 hover:underline">
          ← Mağazaya qayıt
        </Link>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 flex flex-col md:flex-row">
          {/* Sol tərəf: Böyük şəkil */}
          <div className="md:w-1/2 bg-gray-100 p-8 flex items-center justify-center">
            <img 
              src={product.thumbnail} 
              alt={product.title} 
              className="max-h-96 object-contain hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Sağ tərəf: Detallar */}
          <div className="md:w-1/2 p-10 flex flex-col">
            <span className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-2">{product.category}</span>
            <h1 className="text-4xl font-black text-gray-900 mb-4">{product.title}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-bold text-sm">
                ★ {product.rating}
              </span>
              <span className="text-gray-400">|</span>
              <span className="text-green-600 font-semibold">{product.stock} ədəd stokda var</span>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              {product.description}
            </p>

            <div className="mt-auto border-t border-gray-100 pt-8 flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Qiymət:</p>
                <span className="text-4xl font-black text-gray-900">${product.price}</span>
              </div>
              <button className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 active:scale-95">
                Səbətə əlavə et
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;