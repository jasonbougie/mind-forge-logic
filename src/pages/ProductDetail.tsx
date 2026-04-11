import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { storefrontApiRequest, PRODUCT_BY_HANDLE_QUERY } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Loader2, ArrowLeft, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!handle) return;
      try {
        const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
        if (data?.data?.product) {
          setProduct(data.data.product);
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [handle]);

  const handleAddToCart = async () => {
    if (!product) return;
    const variant = product.variants.edges[selectedVariantIndex]?.node;
    if (!variant) return;
    await addItem({
      product: { node: product },
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success(`${product.title} added to cart`);
  };

  if (loading) {
    return (
      <main>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main>
        <Header />
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
          <ShoppingBag className="h-16 w-16 text-muted-foreground" />
          <p className="text-xl text-muted-foreground">Product not found</p>
          <Link to="/">
            <Button variant="outline"><ArrowLeft className="h-4 w-4 mr-2" />Back to Home</Button>
          </Link>
        </div>
      </main>
    );
  }

  const images = product.images.edges;
  const variants = product.variants.edges;
  const selectedVariant = variants[selectedVariantIndex]?.node;
  const hasMultipleVariants = variants.length > 1 && !(variants.length === 1 && variants[0].node.title === "Default Title");

  return (
    <main>
      <Header />
      <div className="container px-6 md:px-12 py-12">
        <Link to="/#shop" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />Back to Shop
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-muted rounded-lg overflow-hidden">
              {images[selectedImage]?.node ? (
                <img
                  src={images[selectedImage].node.url}
                  alt={images[selectedImage].node.altText || product.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ShoppingBag className="h-16 w-16 text-muted-foreground" />
                </div>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {images.map((img: any, i: number) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-20 h-20 rounded-md overflow-hidden flex-shrink-0 border-2 ${i === selectedImage ? 'border-primary' : 'border-transparent'}`}
                  >
                    <img src={img.node.url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">{product.title}</h1>
            <p className="text-2xl font-bold text-primary">
              ${parseFloat(selectedVariant?.price.amount || "0").toFixed(2)}
            </p>
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>

            {hasMultipleVariants && (
              <div className="space-y-3">
                {product.options.map((option: any) => (
                  <div key={option.name}>
                    <label className="text-sm font-medium text-foreground mb-2 block">{option.name}</label>
                    <div className="flex flex-wrap gap-2">
                      {option.values.map((value: string) => {
                        const variantIndex = variants.findIndex((v: any) =>
                          v.node.selectedOptions.some((o: any) => o.name === option.name && o.value === value)
                        );
                        const isSelected = variants[selectedVariantIndex]?.node.selectedOptions.some(
                          (o: any) => o.name === option.name && o.value === value
                        );
                        return (
                          <Button
                            key={value}
                            variant={isSelected ? "default" : "outline"}
                            size="sm"
                            onClick={() => variantIndex >= 0 && setSelectedVariantIndex(variantIndex)}
                          >
                            {value}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <Button
              variant="cta"
              size="lg"
              className="w-full"
              onClick={handleAddToCart}
              disabled={isLoading || !selectedVariant?.availableForSale}
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : !selectedVariant?.availableForSale ? "Sold Out" : "Add to Cart"}
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default ProductDetail;
