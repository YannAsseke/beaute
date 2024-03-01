import { RiAppsFill, RiAppsLine, RiHeart3Fill, RiHeart3Line, RiHome2Fill, RiHome2Line, RiSearchFill, RiSearchLine, RiShoppingBagFill, RiShoppingBagLine } from "react-icons/ri";

export const footerMenuItems = [
  {
    id: 1,
    active: true,
    title: "Accueil",
    fillIcon: <RiHome2Fill className="activated" />,
    lineIcon: <RiHome2Line className="deactivated" />,
    path: "/",
  },
  {
    id: 2,
    active: false,
    title: "Categories",
    className: "mobile-category",
    fillIcon: <RiAppsFill className="activated" />,
    lineIcon: <RiAppsLine className="deactivated" />,
    path: "/collections",
  },
  {
    id: 3,
    active: false,
    title: "Recherche",
    lineIcon: <RiSearchLine className="deactivated" />,
    fillIcon: <RiSearchFill className="activated" />,
    path: "/search",
  },
 // {
 // id: 4,
 //   active: false,
 // title: "My Wish",
// lineIcon: <RiHeart3Line className="deactivated" />,
//    fillIcon: <RiHeart3Fill className="activated" />,
//    path: "/wishlist",
 // },
 // {
 //   id: 5,
//    active: false,
 //   title: "Panier",
 //   lineIcon: <RiShoppingBagLine className="deactivated" />,
 //   fillIcon: <RiShoppingBagFill className="activated" />,
//    path: "/cart",
//  },
];
