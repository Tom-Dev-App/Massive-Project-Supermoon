import imgKuliner1 from "../../assets/images/DetailWisata/DetailWisata-1/kuliner-1.png";
import imgKulinerDetail1 from "../../assets/images/DetailKuliner/kuliner-detail-1.png";
import imgKuliner2 from "../../assets/images/DetailWisata/DetailWisata-1/kuliner-2.png";
import imgKulinerDetail2 from "../../assets/images/DetailKuliner/kuliner-detail-2.jpg";
import imgKuliner3 from "../../assets/images/DetailWisata/DetailWisata-1/kuliner-3.png";
import imgKulinerDetail3 from "../../assets/images/DetailKuliner/kuliner-detail-3.jpg";

const Culinary = [
  {
    id: 1,
    title: "Grage Lanai Resto",
    categories: ["Taman", "Restoran", "Makanan"],
    rating: 4.7,
    review: 1000,
    facilities: ["Wifi", "Musholla", "Parkir"],
    description:
      "Grage Lanai Resto merupakan restoran sunda yang berada di kabupaten kuningan dengan menghidangkan berbagai masakan sunda. Dengan menyediakan menu paket serta tempat tersebut dapat disewa untuk acara ulang tahun serta pernikahan.",
    jam_operasional: "Jam Operasional 10.00 WIB - 22.00 WIB",
    location:
      "Jl. Raya Sangkanurip No.1, Panawuan, Kec. Cilimus, Kabupaten Kuningan, Jawa Barat 45556",
    img_card: imgKuliner1,
    img_detail: imgKulinerDetail1,
    komentar: [
      {
        nama: "Salsabila Abadi",
        description:
          "Tempat Wisatanya keren serta fasilitas yang ada juga sangat terawat dengan baik",
        rating: [1, 2, 3, 4, 5],
        waktu: "November 2023",
      },
      {
        nama: "Abadi Salsabila",
        description:
          "Tempat Wisatanya keren serta fasilitas yang ada juga sangat terawat dengan baik",
        rating: [1, 2, 3, 4, 5],
        waktu: "November 2023",
      },
    ],
  },
  {
    id: 2,
    title: "Rame Saga",
    categories: ["Japan", "Ramen", "Restoran"],
    rating: 4.3,
    review: 2000,
    facility: ["Parkir", "Musholla", "Toilet"],
    description:
      "Sesuai dengan namanya, menu andalan restoran ini tentu saja adalah ramen. Disini, ada berbagai jenis dan variasi ramen yang bisa kita pesan. Misalnya, Vege-men (isi sayuran), Cheese-men (bertabur keju), Ce-men (isi ceker), Beef-men (isi daging sapi), dan masih banyak lagi.",
    jam_operasional: "Jam Operasional 08.00 - 21.00 WIB",
    location:
      "Jl.Raya Manis Lor No.Km.25,Manislor, Kec.Kuningan, Kab.Kuningan Jawa Barat",
    img_card: imgKuliner2,
    img_detail: imgKulinerDetail2,
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
    title: "Tamkot Kitchen",
    categories: ["Ayam", "Restoran", "Lezat"],
    rating: 4.5,
    review: 1500,
    facility: ["Parkir", "Toilet"],
    description:
      "Tamkot kitchen sangat ramai pengunjung setiap hari nya. Karena berada di tempat strategis yaitu di taman kota kuningan. Pelayanan nya pun sangat ramah. Suasana nyaman untuk nongkrong dengan teman. Ada live music",
    jam_operasional: "Jam Operasional 08.00 - 21.00 WIB",
    location:
      "Jl Veteran, Taman Kota Kuningan, Deretan Ruko Sisi Timur, Kuningan, Kec. Kuningan, Kabupaten Kuningan, Jawa Barat",
    img_card: imgKuliner3,
    img_detail: imgKulinerDetail3,
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

export default Culinary;
