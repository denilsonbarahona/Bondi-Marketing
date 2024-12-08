import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title:
    "Bondi | Sustainable Fashion Marketplace - Buy, Sell, and Rent Clothes",
  description:
    "Join Bondi, the global platform for sustainable fashion. Buy, sell, and rent unique clothes while contributing to the circular economy. Make fashion eco-friendly and affordable today!",
  keywords: [
    "Bondi",
    "Sustainable fashion marketplace",
    "Buy and sell secondhand clothes",
    "Circular economy platform",
    "Rent clothes online",
    "Eco-friendly clothing store",
    "Extend the life of clothes",
    "Secondhand fashion for women",
    "Secondhand fashion for men",
    "Affordable sustainable fashion",
    "Sustainable living ideas",
    "Eco-conscious shopping platform",
    "How to sell used clothes sustainably",
    "Best platforms for buying secondhand clothes",
    "Rent designer clothes sustainably",
    "Environmentally friendly fashion choices",
    "Circular economy for fashion",
    "Moda sostenible en línea",
    "Compra y venta de ropa de segunda mano",
    "Plataforma de economía circular",
    "Alquiler de ropa online",
    "Tienda de ropa ecológica",
    "Extiende la vida útil de la ropa",
    "Moda de segunda mano para mujeres",
    "Moda de segunda mano para hombres",
    "Ropa sostenible y accesible",
    "Plataforma de consumo consciente",
    "Ideas de vida sostenible",
    "Cómo vender ropa usada de manera sostenible",
    "Mejores plataformas para comprar ropa de segunda mano",
    "Alquiler de ropa sostenible y ecológica",
    "Opciones de moda amigables con el medio ambiente",
    "Economía circular aplicada a la moda",
  ],
  robots: "all",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
