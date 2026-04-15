document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("galeriaTrack");

  const imagenes = [
    
    "https://res.cloudinary.com/dnpevelfb/image/upload/v1769016209/1_b5vz3w.jpg",
    
    "https://res.cloudinary.com/dnpevelfb/image/upload/v1769016215/7_ivqmz8.jpg",
    "https://res.cloudinary.com/dnpevelfb/image/upload/v1769016213/8a_a2aqaw.jpg",
    "https://res.cloudinary.com/dnpevelfb/image/upload/v1769016214/14_iklnl3.jpg",
    "https://res.cloudinary.com/dnpevelfb/image/upload/v1769016218/19_jbzixh.jpg",
    "https://res.cloudinary.com/dnpevelfb/image/upload/v1769016216/24_jio6jc.jpg",
    "https://res.cloudinary.com/dnpevelfb/image/upload/v1769031476/e_mmwiqi.jpg",
    "https://res.cloudinary.com/dnpevelfb/image/upload/v1769031460/b_m74bfl.jpg",
    "https://res.cloudinary.com/dnpevelfb/image/upload/v1769031459/a_jonmf7.jpg",
    "https://res.cloudinary.com/dnpevelfb/image/upload/v1769031460/d_pax6pr.jpg",
    "https://res.cloudinary.com/dnpevelfb/image/upload/v1769031459/c_e9y3rs.jpg"
  ];

  // duplicamos para efecto infinito
  const total = imagenes.concat(imagenes);

  total.forEach(src => {
    const card = document.createElement("div");
    card.className = "galeria-item";
    card.style.backgroundImage = `url(${src})`;
    track.appendChild(card);
  });
});
