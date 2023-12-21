import React from "react";
import imgArticle from "../../assets/images/Beranda/article.png";
import { Link } from "react-router-dom";

const Article = () => {
  return (
    <>
      <section className="mt-10 font-productSans">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-20 xl:gap-0 lg:py-15 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <img src={imgArticle} alt="Wondefull Kuningan" className="w-full" />
          </div>
          <div className="flex-col mt-10 lg:mt-0 lg:col-span-5 lg:flex gap-4">
            <h3 className="lg:text-5xl text-2xl font-bold mb-4">
              Mulailah Petualangan Anda! Temukan Keajaiban Kabupaten Kuningan
            </h3>
            <p className="lg:text-base text-sm mb-4">
              Jelajahi pesona alam, nikmati kelezatan kuliner khas, dan rasakan
              kehangatan kebudayaan Kabupaten Kuningan. Dengan keindahan alam
              yang memukau, keunikan kuliner yang menggugah selera, dan warisan
              budaya yang tak ternilai, Kabupaten Kuningan menanti untuk
              dijelajahi. Segera temukan keajaiban ini dan mulailah petualangan
              Anda di Kabupaten Kuningan sekarang! #WonderfulKuningan
              #ExploreKuningan #DiscoverTheBeauty
            </p>
            <div className="lg:col-span-5">
              <Link
                to="/paket-wisata"
                className="text-center px-4 py-2 gap-1 text-base text-neutral-10 rounded-lg bg-primary-main"
              >
                Mulai
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Article;
