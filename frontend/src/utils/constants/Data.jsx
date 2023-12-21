// import img-card
import img1 from "../../assets/images/Beranda/wisata/sidomba.png";
import img2 from "../../assets/images/Beranda/wisata/cibulan.png";
import img3 from "../../assets/images/Beranda/wisata/ciremai.png";
import img4 from "../../assets/images/Beranda/wisata/cilengkrang.png";
import img5 from "../../assets/images/Beranda/wisata/lingarjati.png";
import img6 from "../../assets/images/Beranda/wisata/sukageuri.png";

// detail image 1
import detailWisataCidomba1 from "../../assets/images/DetailWisata/DetailWisata-1/images-1.jpg";
import detailWisataCidomba2 from "../../assets/images/DetailWisata/DetailWisata-1/images-2.jpg";
import detailWisataCidomba3 from "../../assets/images/DetailWisata/DetailWisata-1/images-3.jpg";
import detailWisataCidomba4 from "../../assets/images/DetailWisata/DetailWisata-1/images-4.jpg";
// detail image 2
import detailWisataCibulan1 from "../../assets/images/DetailWisata/DetailWisata-2/1.jpg";
import detailWisataCibulan2 from "../../assets/images/DetailWisata/DetailWisata-2/2.jpg";
import detailWisataCibulan3 from "../../assets/images/DetailWisata/DetailWisata-2/3.jpg";
import detailWisataCibulan4 from "../../assets/images/DetailWisata/DetailWisata-2/4.jpg";
// detail image 3
import detailWisataCiremai1 from "../../assets/images/DetailWisata/DetailWisata-3/1.jpg";
import detailWisataCiremai2 from "../../assets/images/DetailWisata/DetailWisata-3/2.jpg";
import detailWisataCiremai3 from "../../assets/images/DetailWisata/DetailWisata-3/3.jpg";
import detailWisataCiremai4 from "../../assets/images/DetailWisata/DetailWisata-3/4.jpg";
// detail image 4
import detailWisataCilengkrang1 from "../../assets/images/DetailWisata/DetailWisata-4/1.jpg";
import detailWisataCilengkrang2 from "../../assets/images/DetailWisata/DetailWisata-4/2.jpg";
import detailWisataCilengkrang3 from "../../assets/images/DetailWisata/DetailWisata-4/3.jpg";
import detailWisataCilengkrang4 from "../../assets/images/DetailWisata/DetailWisata-4/4.jpg";
// detail image 5
import detailWisataLingarjati1 from "../../assets/images/DetailWisata/DetailWisata-5/1.jpg";
import detailWisataLingarjati2 from "../../assets/images/DetailWisata/DetailWisata-5/2.jpg";
import detailWisataLingarjati3 from "../../assets/images/DetailWisata/DetailWisata-5/3.jpg";
import detailWisataLingarjati4 from "../../assets/images/DetailWisata/DetailWisata-5/4.jpg";
// detail image 6
import detailWisataSukageuri1 from "../../assets/images/DetailWisata/DetailWisata-6/1.jpg";
import detailWisataSukageuri2 from "../../assets/images/DetailWisata/DetailWisata-6/2.jpg";
import detailWisataSukageuri3 from "../../assets/images/DetailWisata/DetailWisata-6/3.jpg";
import detailWisataSukageuri4 from "../../assets/images/DetailWisata/DetailWisata-6/4.jpg";

const tours = [
  {
    id: 1,
    title: "Curug Cidomba",
    category: [
      {
        category1: "Perkemahan",
      },
      {
        category2: "Curug",
      },
      {
        category3: "Kolam Renang",
      },
    ],
    description:
      "Sidomba, terkenal sebagai tujuan wisata di Kuningan, sering dijadikan tempat berkemah oleh berbagai lembaga, baik yang resmi maupun non resmi. Kawasan Bumi Perkemahan Sidomba memiliki luas yang sangat besar, dapat menampung banyak tenda secara bersamaan, bahkan mungkin mencapai ratusan. Selain itu, lokasi ini dilengkapi dengan berbagai wahana dan fasilitas komprehensif, memungkinkan pengunjung untuk menikmati beragam aktivitas selama berada di Sidomba.",
    location:
      "Desa Peusing, Kecamatan Jalaksana, Kabupaten Kuningan, Provinsi Jawa Barat",
    image_card: img1,
    image_details: [
      {
        img1: detailWisataCidomba1,
      },
      {
        img2: detailWisataCidomba2,
      },
      {
        img3: detailWisataCidomba3,
      },
      {
        img4: detailWisataCidomba4,
      },
    ],
    ticket: [
      {
        price1: 10000,
      },
      {
        price2: 12000,
      },
    ],
    facility: [
      {
        facility1: "Toilet",
      },
      {
        facility2: "Masjid",
      },
      {
        facility3: "Parkir",
      },
      {
        facility4: "Kolam Renang",
      },
      {
        facility5: "Warung",
      },
      {
        facility6: "Plying Fox",
      },
      {
        facility7: "Gedung Serbaguna",
      },
      {
        facility8: "Bumi Perkemahan",
      },
    ],
    rating: 4.8,
    review: 1000,
    jam_operasional: "Beroperasional mulai pukul 07 pagi sampai dengan 05 sore",
    komentar: [
      {
        nama: "Salsabila Abadi",
        description:
          "Tempat Wisatanya keren serta fasilitas yang ada juga sangat terawat dengan baik",
        rating: [
          {
            rating1: "1",
            rating2: "2",
            rating3: "3",
            rating4: "4",
            rating5: "5",
          },
        ],
        waktu: "November 2023",
      },
      {
        nama: "Abadi Salsabila",
        description:
          "Tempat Wisatanya keren serta fasilitas yang ada juga sangat terawat dengan baik",
        rating: [
          {
            rating1: "1",
            rating2: "2",
            rating3: "3",
            rating4: "4",
            rating5: "5",
          },
        ],
        waktu: "November 2023",
      },
    ],
  },
  {
    id: 2,
    title: "Curug Cibulan",
    category: [
      {
        category1: "Kolam Renang",
      },
      {
        category2: "Sejarah",
      },
      {
        category3: "Alam",
      },
    ],
    description:
      "Cibulan merupakan salah satu destinasi wisata tertua di Kuningan, Jawa Barat, Indonesia, telah menjadi tempat liburan populer sejak diresmikan pada 27 Agustus 1939 oleh Bupati Kuningan, R.A.A. Mohamand Achmad. Obyek wisata ini menampilkan dua kolam besar dengan bentuk persegi panjang",
    location:
      "Desa Manis Kidul, Kecamatan Jalaksana, Kabupaten Kuningan, Jawa Barat - Indonesia",
    image_card: img2,
    image_details: [
      {
        img1: detailWisataCibulan1,
      },
      {
        img2: detailWisataCibulan2,
      },
      {
        img3: detailWisataCibulan3,
      },
      {
        img4: detailWisataCibulan4,
      },
    ],
    ticket: [
      {
        price1: 18000,
      },
      {
        price2: 25000,
      },
    ],
    facility: [
      {
        facility1: "Parkir",
      },
      {
        facility2: "Toilet",
      },
      {
        facility3: "Restoran",
      },
      {
        facility4: "Masjid",
      },
    ],
    rating: 4.7,
    review: 2100,
    jam_operasional: "Beroperasional mulai pukul 07 pagi sampai dengan 05 sore",
    komentar: [
      {
        nama: "Salsabila Abadi",
        description:
          "Tempat Wisatanya keren serta fasilitas yang ada juga sangat terawat dengan baik",
        rating: [
          {
            rating1: "1",
            rating2: "2",
            rating3: "3",
            rating4: "4",
            rating5: "5",
          },
        ],
        waktu: "November 2023",
      },
      {
        nama: "Abadi Salsabila",
        description:
          "Tempat Wisatanya keren serta fasilitas yang ada juga sangat terawat dengan baik",
        rating: [
          {
            rating1: "1",
            rating2: "2",
            rating3: "3",
            rating4: "4",
            rating5: "5",
          },
        ],
        waktu: "November 2023",
      },
    ],
  },
  {
    id: 3,
    title: "Gunung Ciremai",
    category: [
      {
        category1: "Alam",
      },
      {
        category2: "Kemah",
      },
      {
        category3: "Gunung",
      },
    ],
    description:
      "Gunung Ciremai, yang terletak di Jawa Barat, adalah puncak tertinggi di wilayah tersebut. Puncak ini memiliki dua kawah, yaitu kawah barat dengan radius 400 m yang terpotong oleh kawah timur berradius 600 m. Di lereng selatan pada ketinggian sekitar 2.900 mdpl, terdapat jejak letusan yang dikenal sebagai Gowa Walet.",
    location:
      "gunung berapi kerucut yang secara administratif termasuk dalam wilayah dua kabupaten, yakni Kabupaten Kuningan dan Kabupaten Majalengka, Provinsi Jawa Barat.",
    image_card: img3,
    image_details: [
      {
        img1: detailWisataCiremai1,
      },
      {
        img2: detailWisataCiremai2,
      },
      {
        img3: detailWisataCiremai3,
      },
      {
        img4: detailWisataCiremai4,
      },
    ],
    ticket: [
      {
        price1: 5000,
      },
      {
        price2: 7500,
      },
      {
        price3: 3000,
      },
      {
        price4: 4500,
      },
      {
        price5: 150000,
      },
      {
        price6: 225000,
      },
      {
        price7: 100000,
      },
      {
        price8: 150000,
      },
    ],
    facility: [
      {
        facility1: "Mushola",
      },
      {
        facility2: "Toilet",
      },
      {
        facility3: "Warung",
      },
    ],
    rating: 4.3,
    review: 1200,
    jam_operasional: "Beroperasional mulai pukul 07 pagi sampai dengan 05 sore",
    komentar: [
      {
        nama: "Salsabila Abadi",
        description:
          "Tempat Wisatanya keren serta fasilitas yang ada juga sangat terawat dengan baik",
        rating: [
          {
            rating1: "1",
            rating2: "2",
            rating3: "3",
            rating4: "4",
            rating5: "5",
          },
        ],
        waktu: "November 2023",
      },
      {
        nama: "Abadi Salsabila",
        description:
          "Tempat Wisatanya keren serta fasilitas yang ada juga sangat terawat dengan baik",
        rating: [
          {
            rating1: "1",
            rating2: "2",
            rating3: "3",
            rating4: "4",
            rating5: "5",
          },
        ],
        waktu: "November 2023",
      },
    ],
  },
  {
    id: 4,
    title: "Curug Cilengkrang",
    category: [
      {
        category1: "Alam",
      },
      {
        category2: "Curug",
      },
      {
        category3: "Mata Air Panas",
      },
    ],
    description:
      "Suasana alam yang damai dan sangat subur, didukung oleh keindahan air terjun yang memukau dan hutan yang penuh dengan pepohonan yang rimbun. Di sini, juga menjadi tempat tinggal bagi beragam satwa liar yang masih terlindungi.",
    location:
      "Awirarangan, Kec. Kuningan, Kabupaten Kuningan, Jawa Barat 45511, Indonesia",
    image_card: img4,
    image_details: [
      {
        img1: detailWisataCilengkrang1,
      },
      {
        img2: detailWisataCilengkrang2,
      },
      {
        img3: detailWisataCilengkrang3,
      },
      {
        img4: detailWisataCilengkrang4,
      },
    ],
    ticket: 17000,
    facility: "Camping",
    rating: 4.4,
    review: 2300,
    jam_operasional: "Beroperasional mulai pukul 07 pagi sampai dengan 05 sore",
    komentar: [
      {
        nama: "Salsabila Abadi",
        description:
          "Tempat Wisatanya keren serta fasilitas yang ada juga sangat terawat dengan baik",
        rating: [
          {
            rating1: "1",
            rating2: "2",
            rating3: "3",
            rating4: "4",
            rating5: "5",
          },
        ],
        waktu: "November 2023",
      },
      {
        nama: "Abadi Salsabila",
        description:
          "Tempat Wisatanya keren serta fasilitas yang ada juga sangat terawat dengan baik",
        rating: [
          {
            rating1: "1",
            rating2: "2",
            rating3: "3",
            rating4: "4",
            rating5: "5",
          },
        ],
        waktu: "November 2023",
      },
    ],
  },
  {
    id: 5,
    title: "Perundingan Lingarjati",
    category: [
      {
        category1: "Sejarah",
      },
      {
        category2: "Museum",
      },
      {
        category3: "Taman",
      },
    ],
    description:
      "Destinasi pariwisata Gedung Perundingan Linggarjati di Cilimus, Kuningan, Jawa Barat, menampilkan daya tarik keindahan yang begitu menarik untuk dinikmati. Merupakan suatu kerugian apabila Anda berada di Kota Kuningan tanpa meluangkan waktu untuk mengunjungi tempat bersejarah ini yang memancarkan keindahan yang unik dan tak tertandingi.",
    location: "Linggarjati, Cilimus, Kuningan, Jawa Barat",
    image_card: img5,
    image_details: [
      {
        img1: detailWisataLingarjati1,
      },
      {
        img2: detailWisataLingarjati2,
      },
      {
        img3: detailWisataLingarjati3,
      },
      {
        img4: detailWisataLingarjati4,
      },
    ],
    ticket: 2000,
    facility: [
      {
        facility1: "Parkir",
      },
      {
        facility2: "Mushola",
      },
      {
        facility3: "Toilet",
      },
      {
        facility4: "Penginapan",
      },
    ],
    rating: 4.3,
    review: 1300,
    jam_operasional: "Beroperasional mulai pukul 07 pagi sampai dengan 05 sore",
    komentar: [
      {
        nama: "Salsabila Abadi",
        description:
          "Tempat Wisatanya keren serta fasilitas yang ada juga sangat terawat dengan baik",
        rating: [
          {
            rating1: "1",
            rating2: "2",
            rating3: "3",
            rating4: "4",
            rating5: "5",
          },
        ],
        waktu: "November 2023",
      },
      {
        nama: "Abadi Salsabila",
        description:
          "Tempat Wisatanya keren serta fasilitas yang ada juga sangat terawat dengan baik",
        rating: [
          {
            rating1: "1",
            rating2: "2",
            rating3: "3",
            rating4: "4",
            rating5: "5",
          },
        ],
        waktu: "November 2023",
      },
    ],
  },
  {
    id: 6,
    title: "Sukageuri View",
    category: [
      {
        category1: "Perkemahan",
      },
      {
        category2: "Alam",
      },
      {
        category3: "Bukit",
      },
    ],
    description:
      "Sukageuri View adalah pilihan wisata yang cerdas karena memiliki berbagai keunggulan, termasuk fasilitas yang lengkap dan pemandangan yang menakjubkan. Tempat ini terkenal sebagai destinasi camping yang sangat cocok untuk berfoto Instagram.",
    location:
      "Jl. Palutungan, Desa Cisantana, Kecamatan Cigugur, Kabupaten Kuningan, Jawa Barat.",
    image_card: img6,
    image_details: [
      {
        img1: detailWisataSukageuri1,
      },
      {
        img2: detailWisataSukageuri2,
      },
      {
        img3: detailWisataSukageuri3,
      },
      {
        img4: detailWisataSukageuri4,
      },
    ],
    ticket: 15000,
    facility: [
      {
        facility1: "Parkir",
      },
      {
        facility2: "Mushola",
      },
      {
        facility3: "Toilet",
      },
      {
        facility4: "Camping",
      },
      {
        facility5: "Warung",
      },
    ],
    rating: 4.7,
    review: 990,
    jam_operasional: "Beroperasional mulai pukul 07 pagi sampai dengan 05 sore",
    komentar: [
      {
        nama: "Salsabila Abadi",
        description:
          "Tempat Wisatanya keren serta fasilitas yang ada juga sangat terawat dengan baik",
        rating: [
          {
            rating1: "1",
            rating2: "2",
            rating3: "3",
            rating4: "4",
            rating5: "5",
          },
        ],
        waktu: "November 2023",
      },
      {
        nama: "Abadi Salsabila",
        description:
          "Tempat Wisatanya keren serta fasilitas yang ada juga sangat terawat dengan baik",
        rating: [
          {
            rating1: "1",
            rating2: "2",
            rating3: "3",
            rating4: "4",
            rating5: "5",
          },
        ],
        waktu: "November 2023",
      },
    ],
  },
];

export default tours;
