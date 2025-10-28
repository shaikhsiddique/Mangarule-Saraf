import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { useCart } from "../../context/CartContext";

// Sample product data - in real app, this would come from API/database
const productData: { [key: string]: any } = {
  "featured-1": {
    id: "featured-1",
    name: "Elegant Gold Necklace",
    price: "₹15,999",
    originalPrice: "₹18,500",
    images: [
      "https://plus.unsplash.com/premium_photo-1674255466849-b23fc5f5d3eb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
      "https://images.unsplash.com/photo-1610694955371-d4a3e0ce4b52?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
      "https://images.unsplash.com/photo-1708390250220-803af1100d31?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
    ],
    description: "Handcrafted with precision, this elegant gold necklace features intricate detailing and timeless design. Perfect for special occasions and everyday elegance.",
    inStock: true,
    colors: ["Gold", "Rose Gold"],
    offers: [
      "Buy 3 at ₹45,000 Use Code: MEGA3 at checkout",
      "Buy 4 at ₹55,000 Use Code: MEGA4 at checkout", 
      "Buy 1 Get 1 Free Use Code: B1G1 at checkout"
    ]
  },
  "necklace-0": {
    id: "necklace-0",
    name: "Designer Necklace #1",
    price: "₹3,990",
    originalPrice: "₹4,200",
    images: [
      "https://images.unsplash.com/photo-1610694955371-d4a3e0ce4b52?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
      "https://images.unsplash.com/photo-1708390250220-803af1100d31?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
    ],
    description: "A stunning designer necklace that combines traditional craftsmanship with modern aesthetics.",
    inStock: true,
    colors: ["Gold", "Silver"],
    offers: [
      "Buy 2 at ₹7,500 Use Code: PAIR2 at checkout",
      "Free shipping on orders above ₹5,000"
    ]
  },
  "earring-0": {
    id: "earring-0", 
    name: "Elegant Earring #1",
    price: "₹1,450",
    originalPrice: "₹1,800",
    images: [
    
      "https://plus.unsplash.com/premium_photo-1681276169450-4504a2442173?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
    ],
    description: "Elegant earrings that add sophistication to any outfit. Perfect for both casual and formal occasions.",
    inStock: true,
    colors: ["Gold", "Rose Gold", "Silver"],
    offers: [
      "Buy 1 Get 1 Free Use Code: B1G1 at checkout"
    ]
  }
};

// Fallback builders for IDs like "necklace-3", "ring-2", etc.
const FALLBACK_IMAGES: Record<string, string[]> = {
  necklace:  [
    // Unsplash selection
    "https://plus.unsplash.com/premium_photo-1674255466849-b23fc5f5d3eb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
    "https://images.unsplash.com/photo-1610694955371-d4a3e0ce4b52?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
    "https://images.unsplash.com/photo-1708390250220-803af1100d31?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
    "https://images.unsplash.com/photo-1685970731194-e27b477e87ba?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=688",
    "https://images.unsplash.com/photo-1721103418218-416182aca079?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
    "https://images.unsplash.com/photo-1682823544433-aae34df4e3da?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
    // Additional jewelry images
    "https://images.unsplash.com/photo-1650785468216-39788ac5a0dd?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
    "https://images.unsplash.com/photo-1680690935158-7b7f2d5259dd?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=735",
    "https://images.unsplash.com/photo-1705326453292-f3d35cd96514?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
    "https://images.unsplash.com/photo-1739194097821-a0fbea48a3f0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=688",
   
  ],
  earring: [
    "https://plus.unsplash.com/premium_photo-1681276169450-4504a2442173?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
    "https://images.unsplash.com/photo-1600721391776-b5cd0e0048f9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
    "https://images.unsplash.com/photo-1708220084835-1dd17a8ed8ad?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
    "https://images.unsplash.com/photo-1708221235473-69e1500dd3bc?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
    "https://images.unsplash.com/photo-1693212793204-bcea856c75fe?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=880",
    "https://plus.unsplash.com/premium_photo-1757960107520-b0a8736c06fa?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
    "https://plus.unsplash.com/premium_photo-1681276170291-27698ccc0a8e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
    "https://plus.unsplash.com/premium_photo-1675107359685-f268487a3a46?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
    "https://plus.unsplash.com/premium_photo-1675107359827-6de8bcf03ccf?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
    "https://plus.unsplash.com/premium_photo-1691030255383-ec9765ad5340?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687"
  ],
  ring:  [
    "https://plus.unsplash.com/premium_photo-1661308304093-009586f280a5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
    "https://plus.unsplash.com/premium_photo-1739548337724-f641c8b5c886?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
    "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=880",
    "https://plus.unsplash.com/premium_photo-1678749105251-b15e8fd164bf?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1112",
    "https://images.unsplash.com/photo-1542990254-85e6a9a2ef92?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
    "https://images.unsplash.com/photo-1663079899584-64acea4d6858?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
    "https://images.unsplash.com/photo-1550368566-f9cc32d7392d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
    "https://images.unsplash.com/photo-1689287428894-9b52d1534a25?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=608",
    "https://plus.unsplash.com/premium_photo-1678834778658-9862d9987dd3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
    "https://images.unsplash.com/photo-1631982690223-8aa4be0a2497?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=764",
  ],
  bracelet: [
    "https://images.unsplash.com/photo-1633810543462-77c4a3b13f07?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=764",
    "https://images.unsplash.com/photo-1708221235482-a6e2a807198f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
    "https://images.unsplash.com/photo-1708389828485-66de31e8a165?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
    "https://images.unsplash.com/photo-1708389828432-a5bccf98bb01?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
    "https://images.unsplash.com/photo-1708389828426-352ec7241c8e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
    "https://images.unsplash.com/photo-1723522938779-d434eb9294d4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
    "https://images.unsplash.com/photo-1723522938880-12dedc1275a5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
    "https://plus.unsplash.com/premium_photo-1671641737519-841d15b5211f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
    "https://images.unsplash.com/photo-1597006354775-2955b15ec026?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
    "https://images.unsplash.com/photo-1708221235482-a6e2a807198f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687"
  ],
  "daily": [
    "https://images.unsplash.com/photo-1611652022419-a9419f74343d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=688",
    "https://plus.unsplash.com/premium_photo-1674748385436-db725f68e312?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
    "https://plus.unsplash.com/premium_photo-1669835163351-785a187cdf95?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=735",
    "https://plus.unsplash.com/premium_photo-1739548338276-e9c3a49b3a95?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
    "https://plus.unsplash.com/premium_photo-1739548332792-8fae4d490124?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1171",
    "https://plus.unsplash.com/premium_photo-1669366530656-66be1ff89245?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
    "https://images.unsplash.com/photo-1689776948405-23aee5f305fe?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=765",
    "https://images.unsplash.com/photo-1721103418981-0ee59b80592e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
    "https://plus.unsplash.com/premium_photo-1724075323544-64a09f14f80b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=702",
    "https://plus.unsplash.com/premium_photo-1679448062006-089bb6570bdd?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687"
  ],
  mangalsutra:[
    "https://plus.unsplash.com/premium_photo-1682092635235-d775b3103eb8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
    "https://plus.unsplash.com/premium_photo-1669977749936-1343d0b0b4d9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=774",
    "https://plus.unsplash.com/premium_photo-1669977749819-d8737b4408f7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1178",
   "https://images.unsplash.com/photo-1685970731194-e27b477e87ba?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=688",
    "https://images.unsplash.com/photo-1721103418218-416182aca079?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
    "https://images.unsplash.com/photo-1682823544433-aae34df4e3da?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
    // Additional jewelry images
    "https://images.unsplash.com/photo-1650785468216-39788ac5a0dd?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
    "https://images.unsplash.com/photo-1680690935158-7b7f2d5259dd?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=735",
    "https://images.unsplash.com/photo-1705326453292-f3d35cd96514?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
    "https://images.unsplash.com/photo-1739194097821-a0fbea48a3f0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=688",
  ],
  party:[
    "https://plus.unsplash.com/premium_photo-1740020264402-3a493f16dac8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
    "https://images.unsplash.com/photo-1758995115785-d13726ac93f0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
    "https://images.unsplash.com/photo-1758995115682-1452a1a9e35b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=990",
    "https://images.unsplash.com/photo-1722410180670-b6d5a2e704fa?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
    "https://images.unsplash.com/photo-1739194806935-3b4c66aee282?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=715",
    "https://images.unsplash.com/photo-1744822220368-c380740bfc7f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
    "https://images.unsplash.com/photo-1743264385411-57c883bdc0ea?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=796",
    "https://images.unsplash.com/photo-1744822220368-c380740bfc7f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
    "https://plus.unsplash.com/premium_photo-1757681487375-9c00eb801264?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
    "https://plus.unsplash.com/premium_photo-1757681489045-d86a98ef98ec?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687"
  ],
};

const FALLBACK_PRICES: Record<string, string[]> = {
  necklace: ["₹3,990", "₹2,750", "₹5,500", "₹2,999", "₹4,299", "₹6,200"],
  earring: ["₹1,450", "₹1,290", "₹990", "₹2,299"],
  ring: ["₹24,000", "₹18,999", "₹12,540", "₹22,600"],
  bracelet: ["₹8,990", "₹3,700", "₹2,190", "₹4,999"],
  daily: ["₹2,490", "₹2,100", "₹1,650", "₹3,399"],
  mangalsutra: ["₹11,980", "₹9,990", "₹12,599", "₹8,700"],
  party: ["₹9,999", "₹7,950", "₹4,900", "₹7,290"],
};

function buildProductFromId(id: string) {
  // match formats like "necklace-3", "earring-12", "daily-0", "party-5"
  const match = id.match(/^(necklace|earring|ring|bracelet|daily|mangalsutra|party)-(\d+)$/);
  if (!match) return null;
  const type = match[1];
  const idx = parseInt(match[2], 10) || 0;
  const images = FALLBACK_IMAGES[type] || [];
  const img = images.length ? images[idx % images.length] : "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=80";
  const prices = FALLBACK_PRICES[type] || ["₹2,999"];
  const price = prices[idx % prices.length];
  const nameBase = {
    necklace: "Designer Necklace",
    earring: "Elegant Earring",
    ring: "Stylish Ring",
    bracelet: "Bangle/Bracelet",
    daily: "Everyday Piece",
    mangalsutra: "Mangalsutra",
    party: "Party Jewelry",
  } as Record<string, string>;
  const name = `${nameBase[type] || 'Product'} #${idx + 1}`;
  return {
    id,
    name,
    price,
    originalPrice: undefined,
    images: [img, ...images.filter((u) => u !== img)].slice(0, 3),
    description: "Beautiful handcrafted design with premium finish.",
    inStock: true,
    colors: ["Gold", "Rose Gold"],
    offers: ["Free shipping on orders above ₹5,000"],
  };
}

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);

  const product = productData[id as string] || (id ? buildProductFromId(String(id)) : undefined);

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-heading text-ms-gold mb-4">Product Not Found</h1>
          <button 
            onClick={() => router.push('/')}
            className="gradient-gold-silver text-white px-6 py-2 rounded-lg font-heading shadow-ms-gold"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <Head>
        <title>{product.name} - Mangarule Saraf</title>
        <meta name="description" content={product.description} />
      </Head>

      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-white rounded-xl shadow-ms-card overflow-hidden">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                className="w-full h-96 object-cover"
              />
              {/* Navigation Arrows */}
              <button 
                onClick={() => setSelectedImage(Math.max(0, selectedImage - 1))}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                disabled={selectedImage === 0}
              >
                <svg className="w-5 h-5 text-ms-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={() => setSelectedImage(Math.min(product.images.length - 1, selectedImage + 1))}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                disabled={selectedImage === product.images.length - 1}
              >
                <svg className="w-5 h-5 text-ms-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-2">
              {product.images.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-ms-gold' : 'border-gray-200'
                  }`}
                >
                  <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="space-y-6">
            {/* Offers */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-heading text-lg text-ms-gold mb-3">Special Offers</h3>
              <div className="space-y-2">
                {product.offers.map((offer: string, index: number) => (
                  <p key={index} className="text-sm text-ms-dark">{offer}</p>
                ))}
                <p className="text-xs text-gray-600 mt-2">Note: You need to add minimum 2 products to avail this discount.</p>
                <button className="text-sm text-ms-gold hover:text-ms-dark underline">See All Offers</button>
              </div>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-green-600 font-medium">In stock - ready to ship</span>
            </div>

            {/* Color Options */}
            <div>
              <h3 className="font-heading text-lg text-ms-gold mb-3">Color</h3>
              <div className="flex gap-3">
                {product.colors.map((color: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(index)}
                    className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                      selectedColor === index 
                        ? 'border-ms-gold bg-ms-gold-light text-ms-gold' 
                        : 'border-gray-300 text-gray-700 hover:border-ms-gold'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-ms-gold">{product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-400 line-through">{product.originalPrice}</span>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="font-heading text-lg text-ms-gold mb-3">Description</h3>
              <p className="text-ms-dark leading-relaxed">{product.description}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => addToCart({ id: product.id, name: product.name, image: product.images[0], price: product.price, type: 'Product' })}
                className="flex-1 bg-white border-2 border-ms-gold text-black hover:bg-ms-gold-light py-3 rounded-lg font-heading font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A2 2 0 0 0 7.42 19h9.16a2 2 0 0 0 1.77-3.3L17 13M7 13V6h13m-1 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                </svg>
                ADD TO CART
              </button>
              <button className="gradient-silver-gold hover:shadow-ms-silver text-white py-3 px-6 rounded-lg font-heading font-semibold transition-colors">
                BUY IT NOW
              </button>
              <button className="w-12 h-12 bg-white border border-gray-300 rounded-lg flex items-center justify-center hover:border-ms-gold transition-colors">
                <svg className="w-5 h-5 text-ms-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-heading font-bold text-ms-gold mb-8 text-center">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.values(productData).slice(0, 4).map((relatedProduct) => (
              <div key={relatedProduct.id} className="bg-white rounded-xl shadow-ms-card overflow-hidden hover:shadow-ms-gold transition-shadow group">
                <div className="relative">
                  <img src={relatedProduct.images[0]} alt={relatedProduct.name} className="w-full h-48 object-cover" />
                  <div className="absolute top-2 left-2 bg-ms-gold text-white text-xs px-2 py-1 rounded font-bold">
                    RELATED
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-heading text-ms-gold text-base mb-2">{relatedProduct.name}</h3>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-bold text-ms-gold">{relatedProduct.price}</span>
                    {relatedProduct.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">{relatedProduct.originalPrice}</span>
                    )}
                  </div>
                  <button 
                    onClick={() => router.push(`/product/${relatedProduct.id}`)}
                    className="w-full gradient-gold-silver text-white py-2 rounded-lg font-heading transition-colors hover:shadow-ms-gold"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
