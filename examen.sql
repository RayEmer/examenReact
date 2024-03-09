DROP DATABASE IF EXISTS examen;

CREATE DATABASE IF NOT EXISTS examen;

USE examen;

CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `img` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM;

CREATE TABLE IF NOT EXISTS `posts` (
  `id` INT NOT NULL AUTO_INCREMENT, 
  `titulo` VARCHAR(255) NOT NULL,
   `descripcion` VARCHAR(2000) NOT NULL,
   `imagen` VARCHAR(255) NOT NULL,
   `cat` VARCHAR(45) NOT NULL,
   `fecha` DATETIME NOT NULL,
   `uid` INT NOT NULL,
   PRIMARY KEY (`id`),
   FOREIGN KEY (`uid`) REFERENCES `users`(`id`)
   ) ENGINE = MyISAM;

INSERT INTO `users` (`id`, `username`, `email`, `password`, `img`) VALUES
(1, 'admin', 'admin@admin', '$2a$10$WyScdxhfWsOVifcuU2G9gu5ghYUuTq2CHJBIeRcc4tV3VrnbfRyMK', NULL),
(2, 'MarioTomas', 'usuario1@gmail.com', '$2a$10$WyScdxhfWsOVifcuU2G9gu5ghYUuTq2CHJBIeRcc4tV3VrnbfRyMK', NULL),
(3, 'cine', 'cine@gmail.com', '$2a$10$miYFED5TSkHcVP0ZIJ2BJuoL8m4YWwahEOg1TPsueI30cB6lv/s7.', NULL),
(4, 'abc123', 'abc123@gmail.com', '$2a$10$PuGwSev.AKy6RrrllIX3wuaqJM5mjM1B9lPvTEs2Jh22bsEvxrB8u', NULL);

INSERT INTO `posts` (`id`, `titulo`, `descripcion`, `imagen`, `cat`, `fecha`, `uid`) VALUES
(1, 'Ejemplo de blog', '<h2>Este blog se ha realizado por Mario Tomás Islas Castro</h2>\r\n</h3>El proyecto se utiliza con esquema cliente-servidor donde el servidor sirve de ENDPOINT donde se llaman las funciones para crear usuarios, generar y consultar posts y poder subir imagenes, entre otras cosas</h3>', '1709945722115tecnologia.jpg', '', '2024-03-01 18:55:22', 1),
(2, 'La Revolución Digital en el Arte Contemporáneo', '<h2>El arte contemporáneo ha sido profundamente influenciado por la revolución digital, una era que ha transformado la manera en que los artistas crean, comparten y comercializan su trabajo.</h2><h3>La digitalización ha introducido nuevas formas y medios, como el arte digital y la realidad aumentada, permitiendo experiencias artísticas inmersivas y dinámicas. Los artistas digitales utilizan software y plataformas en línea para dar vida a sus visiones creativas, alcanzando audiencias globales con solo unos clics. Además, la blockchain y los NFTs están redefiniendo la propiedad y la originalidad en el arte digital, ofreciendo a los artistas métodos innovadores para asegurar sus derechos y recibir reconocimiento. Este cambio paradigmático invita tanto a artistas como a espectadores a explorar nuevas fronteras del arte, marcando el inicio de una emocionante era de experimentación y expresión sin precedentes.</h3>', '1709947154656imagen_2024-03-08_191912953.png', 'art', '2024-03-02 19:19:14', 2),
(3, 'Los Avances en la Edición Genética: Promesas y Desafíos', '<h2>La edición genética, particularmente a través de la tecnología CRISPR-Cas9, ha surgido como uno de los avances científicos más revolucionarios de nuestra época. Esta técnica permite modificar el ADN de organismos vivos con una precisión sin precedentes, abriendo posibilidades para curar enfermedades genéticas, mejorar cultivos y desarrollar nuevos tratamientos médicos.</h2><p>Sin embargo, también plantea importantes dilemas éticos y preocupaciones sobre posibles efectos no deseados. La capacidad de alterar el genoma humano, por ejemplo, suscita debates sobre la ética de la edición genética en embriones humanos y las implicaciones a largo plazo para la evolución humana. A medida que exploramos este nuevo horizonte, es crucial equilibrar el potencial de la edición genética con un debate ético riguroso y regulaciones apropiadas.</p>', '1709947273429imagen_2024-03-08_192109265.png', 'science', '2024-03-03 19:21:13', 2),
(4, 'Transformación de la Industria Cinematográfica', '<h2>La industria cinematográfica ha experimentado una transformación radical con la llegada de las plataformas de streaming. Este cambio ha alterado no solo cómo y dónde consumimos contenido audiovisual, sino también cómo se produce y distribuye.</h2><p>Las plataformas de streaming han democratizado el acceso al cine, permitiendo a una audiencia global explorar una diversidad de géneros y culturas cinematográficas desde la comodidad de su hogar. Sin embargo, este cambio también plantea desafíos para los cines tradicionales y la experiencia colectiva de ver películas. Además, la competencia por la atención del espectador fomenta la producción de contenido original, impulsando la innovación, pero también saturando el mercado. La era del streaming está redefiniendo el panorama cinematográfico, marcando un antes y un después en la forma en que entendemos el cine.</p>', '1709948853159imagen_2024-03-08_194729991.png', 'cinema', '2024-03-04 19:47:33', 3),
(5, 'La evolución de la tecnología en los ultimos 5 años', '<h2>En los últimos cinco años, la evolución de los teléfonos celulares ha sido notable, marcando una era de innovación continua y cambio en la comunicación y el entretenimiento. Con la introducción y expansión de la tecnología 5G, los usuarios ahora disfrutan de velocidades de internet significativamente más rápidas, lo que permite una mejor transmisión de video, juegos en línea sin retrasos y descargas instantáneas. </h2><p>La integración de cámaras de alta resolución ha transformado a los celulares en sustitutos de las cámaras profesionales, ofreciendo capacidades fotográficas y de videografía excepcionales que mejoran con cada nuevo modelo. Además, el desarrollo de pantallas con mayor tasa de refresco y resoluciones impresionantes ha mejorado la experiencia visual, haciendo que consumir contenido multimedia sea más inmersivo que nunca. Los avances en la duración de la batería y las tecnologías de carga rápida también han mejorado significativamente la usabilidad diaria de los dispositivos. Con la adopción de interfaces y sistemas operativos más intuitivos, así como el aumento de la capacidad de almacenamiento, los celulares se han convertido en centros de entretenimiento y productividad indispensables en nuestra vida diaria. Estos avances reflejan cómo la tecnología móvil sigue siendo un campo dinámico y en rápida evolución, prometiendo aún más innovaciones en el futuro.</p>', '1709949069139tecnologia.jpg', 'technology', '2024-03-05 19:51:09', 4),
(6, 'Minimalismo en el Diseño: Más que una Tendencia Estética', '<h2>El minimalismo ha emergido como una filosofía dominante en el mundo del diseño, impactando desde la arquitectura y el diseño de interiores hasta el diseño web y de productos. Esta tendencia se centra en la idea de reducir los elementos a lo esencial, creando espacios y productos que son funcionales y estéticamente placenteros sin ser sobrecargados.</h2><p> El minimalismo no solo busca la simplicidad visual, sino que también enfatiza la sostenibilidad y la conciencia ambiental al minimizar el desperdicio y priorizar la calidad sobre la cantidad. A medida que los consumidores se vuelven más conscientes del impacto ambiental de sus elecciones, el minimalismo en el diseño ofrece una respuesta reflexiva y responsable a los desafíos contemporáneos, demostrando que menos puede ser, efectivamente, más.</p>', '1709949151169imagen_2024-03-08_195212952.png', 'design', '2024-03-08 19:52:31', 4);
