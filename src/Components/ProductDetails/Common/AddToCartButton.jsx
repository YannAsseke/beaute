import { useContext } from "react";
import { RiShoppingCartLine } from "react-icons/ri";
import Btn from "@/Elements/Buttons/Btn";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";

const AddToCartButton = ({
  productState,
  addToCart,
  isLoading,
  buyNow,
  extraOption,
}) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, "common");

  const generateWhatsAppMessage = () => {
    // Create a message with the cart content
    let message = `Bonjour, je souhaite passer une commande avec les articles suivants :\n\n`;
    console.log(productState);
    // Iterate over cart products and append each product to the message
    message += `${productState.product.name} - ${productState.productQty} ${
      productState?.productQty > 1 ? "unités" : "unité"
    }\n`;

    // Return the generated message
    return encodeURIComponent(message);
  };

  // Replace this with your WhatsApp number
  const whatsappNumber = "+33745305253";

  // WhatsApp message with cart content
  const whatsappMessage = generateWhatsAppMessage();

  // URL for WhatsApp API
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="dynamic-checkout">
      {productState?.product?.type == "simple" ? (
        <Btn
          className={`${
            productState?.product?.stock_status == "out_of_stock" ||
            productState?.product?.quantity < productState?.productQty
              ? "border-theme-color btn btn-md scroll-button"
              : "bg-theme btn-md scroll-button"
          }`}
          onClick={addToCart}
          disabled={
            productState?.product?.stock_status == "out_of_stock" ||
            productState?.product?.quantity < productState?.productQty
          }
          loading={Number(isLoading)}
        >
          {productState?.product?.stock_status == "out_of_stock" ||
          productState?.product?.quantity < productState?.productQty ? null : (
            <RiShoppingCartLine className="me-2" />
          )}
          {productState?.product?.stock_status == "out_of_stock" ||
          productState?.product?.quantity < productState?.productQty
            ? t("SoldOut")
            : t("AddToCart")}
        </Btn>
      ) : (
        <Btn
          className={`${
            productState?.selectedVariation
              ? productState?.selectedVariation?.stock_status ==
                  "out_of_stock" ||
                productState?.selectedVariation?.quantity <
                  productState?.productQty
                ? "border-theme-color btn btn-md scroll-button"
                : "bg-theme btn-md scroll-button"
              : "bg-theme btn-md scroll-button"
          }`}
          disabled={
            productState?.selectedVariation
              ? productState?.selectedVariation?.stock_status ==
                  "out_of_stock" ||
                productState?.selectedVariation?.quantity <
                  productState?.productQty
              : true
          }
          onClick={addToCart}
          loading={Number(isLoading)}
        >
          {productState?.selectedVariation?.stock_status == "out_of_stock" ||
          productState?.selectedVariation?.quantity <
            productState?.productQty ? null : (
            <RiShoppingCartLine className="me-2" />
          )}
          {productState?.selectedVariation
            ? productState?.selectedVariation?.stock_status == "out_of_stock" ||
              productState?.selectedVariation?.quantity <
                productState?.productQty
              ? t("SoldOut")
              : t("AddToCart")
            : t("AddToCart")}
        </Btn>
      )}
      {extraOption !== false ? (
        productState?.product?.type == "simple" ? (
          <Btn
            href={whatsappURL}
            className="border-theme-color btn btn-md scroll-button"
            disabled={
              productState?.product?.stock_status == "out_of_stock" ||
              productState?.product?.quantity < productState?.productQty
                ? true
                : false
            }
            loading={Number(isLoading)}
          >
            {t("BuyNow")}
          </Btn>
        ) : (
          <Btn
            href={whatsappURL}
            className="border-theme-color btn btn-md scroll-button"
            disabled={
              productState?.selectedVariation?.stock_status == "out_of_stock" ||
              productState?.stock_status == "out_of_stock"
                ? true
                : false
            }
            loading={Number(isLoading)}
          >
            {t("BuyNow")}
          </Btn>
        )
      ) : null}
    </div>
  );
};

export default AddToCartButton;
