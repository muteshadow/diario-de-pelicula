const content = [
    {
        id: 1,
        title: 'Espíritus en la escuela',
        poster: 'movies/School Spirits.png',
        description: 'Después de una misteriosa muerte, una estudiante de secundaria queda atrapada entre dos mundos y comienza su propia investigación para descubrir quién le quitó la vida y por qué.',
        content_type: 'video',

        imdb_rating: 7.7,
        critics_rating: 94,
        trailer_link: 'trailers/School Spirits.mp4',
        is_animation: false,
        type: 'series',            
        slogan: 'Mi llamada “muerte”',

        genres: [1, 4, 13, 43]
    },
    {
        id: 2,
        title: 'A Friend of the Family',
        poster: 'movies/A Friend of the Family.png',
        description: 'La historia de una familia que confía en un hombre carismático y peligroso, quien utiliza la religión y la manipulación psicológica para secuestrar a su hija y controlar su vida durante años.',
        content_type: 'video',

        imdb_rating: 7.3,
        critics_rating: 92,
        trailer_link: 'trailers/A Friend of the Family.mp4',
        is_animation: false,
        type: 'miniseries',
        slogan: 'Le confiaron a sus hijos',

        genres: [1, 5, 11, 25, 31]
    },
    {
        id: 3,
        title: 'Wonka',
        poster: 'movies/Wonka.png',
        description: 'El joven inventor Willy Wonka intenta abrir su propia tienda de chocolate, enfrentándose a la competencia, las prohibiciones y las reglas injustas del juego.',
        content_type: 'video',

        imdb_rating: 6.9,
        critics_rating: 82,
        is_animation: false,
        type: 'movie',
        slogan: 'Todo lo bueno en este mundo empieza con un sueño',

        genres: [9, 10, 15, 44, 45]
    },
    {
        id: 4,
        title: 'Gambito de dama',
        poster: 'movies/The Queen’s Gambit.png',
        description: 'La talentosa ajedrecista Beth Harmon pasa de un orfanato a los torneos más importantes del mundo, mientras lucha contra sus propios demonios y el precio de su talento.',
        content_type: 'video',

        imdb_rating: 8.5,
        critics_rating: 96,
        is_animation: false,
        type: 'miniseries',
        slogan: 'Tienes un don, y pagas por él',

        genres: [1, 14, 19, 21]
    },
    {
        id: 5,
        title: 'Inconcebible',
        poster: 'movies/Unbelievable.png',
        description: 'Investigación sobre una serie de violaciones, donde en el centro está una chica cuyo testimonio al principio nadie quiere creer.',
        content_type: 'video',

        imdb_rating: 8.3,
        critics_rating: 98,
        is_animation: false,
        type: 'miniseries',
        slogan: 'Basado en hechos reales en los que nadie creía',

        genres: [1, 4, 5, 30, 32]
    },
    {
        id: 6,
        title: 'Thirteen',
        poster: 'movies/Thirteen.png',
        description: 'Ivy Moxon regresa a casa después de 13 años de un terrible cautiverio. La policía intenta descubrir toda la verdad sobre su secuestro, su encierro y su increíble supervivencia.',
        content_type: 'video',

        imdb_rating: 7.2,
        critics_rating: 88,
        is_animation: false,
        type: 'miniseries',
        slogan: 'Trece años en cautiverio. Pero la fuga es solo el comienzo',

        genres: [1, 3, 4, 18, 32]
    },
    {
        id: 7,
        title: 'La chica salvaje',
        poster: 'movies/Where the Crawdads Sing.png',
        description: 'Una chica que creció aislada en los pantanos se convierte en la principal sospechosa del asesinato de un habitante local. Poco a poco, su historia revela la verdad sobre el amor, la traición y la supervivencia.',
        content_type: 'video',

        imdb_rating: 7.2,
        critics_rating: 34,
        trailer_link: 'trailers/Where the Crawdads Sing.mp4',
        is_animation: false,
        type: 'movie',
        slogan: 'Todos tienen sus secretos',

        genres: [1, 4, 16, 40],

        parent_id: 23,         
        relation_type: 'adaptation'
    },
    {
        id: 8,
        title: 'Honor Society',
        poster: 'movies/Honor Society.png',
        description: 'Una estudiante ambiciosa llamada Honor intenta conseguir una recomendación para entrar en una universidad prestigiosa, pero la competencia y unos sentimientos inesperados cambian sus planes.',
        content_type: 'video',

        imdb_rating: 6.6,
        critics_rating: 85,
        is_animation: false,
        type: 'movie',
        slogan: 'A veces perder es la decisión correcta',

        genres: [1, 2, 20, 27]
    },
    {
        id: 9,
        title: 'Emma.',
        poster: 'movies/Emma..png',
        description: 'Emma Woodhouse suele meterse en las relaciones de los demás, convencida de que es una buena casamentera, hasta que sus propios sentimientos empiezan a poner en duda su confianza.',
        content_type: 'video',

        imdb_rating: 6.7,
        critics_rating: 86,
        is_animation: false,
        type: 'movie',
        slogan: 'Bella, inteligente y rica. El amor lo decide todo',

        genres: [2, 14, 24, 29]
    },
    {
        id: 10,
        title: 'Maze Runner. Correr o morir',
        poster: 'movies/The Maze Runner.png',
        description: 'Thomas termina entre adolescentes, atrapado en un espacio con un laberinto gigante, y trata de entender las reglas del juego y encontrar la salida.',
        content_type: 'video',

        imdb_rating: 6.8,
        critics_rating: 66,
        is_animation: false,
        type: 'movie',
        slogan: 'Incluso una falsa esperanza es mejor que nada',

        genres: [3, 8, 10, 22, 37],

        parent_id: 27,         
        relation_type: 'adaptation'
    },
    {
        id: 11,
        title: 'Maze Runner: Prueba de fuego',
        poster: 'movies/Maze Runner_ The Scorch Trials.png',
        description: 'Después de escapar del laberinto, Thomas y sus amigos llegan a un mundo destruido, donde los nuevos retos resultan aún más peligrosos que los anteriores.',
        content_type: 'video',

        imdb_rating: 6.3,
        critics_rating: 47,
        is_animation: false,
        type: 'movie',
        slogan: 'El laberinto era solo el comienzo',

        genres: [3, 6, 8, 38, 42],

        parent_id: 10,         
        relation_type: 'spin_off',

        parent_id: 28,         
        relation_type: 'adaptation'
    },
    {
        id: 12,
        title: 'Maze Runner: La cura mortal',
        poster: 'movies/Maze Runner_ The Death Cure.png',
        description: 'Thomas emprende una misión peligrosa para salvar a sus amigos y llegar al centro del sistema que está detrás de los experimentos.',
        content_type: 'video',

        imdb_rating: 6.3,
        critics_rating: 42,
        is_animation: false,
        type: 'movie',
        slogan: 'Todo laberinto tiene su final',

        genres: [1, 6, 8, 23],

        parent_id: 11,         
        relation_type: 'spin_off',

        parent_id: 29,         
        relation_type: 'adaptation'
    },
    {
        id: 13,
        title: 'Rémi sans famille',
        poster: 'movies/Remi Sans Famille.png',
        description: 'El huérfano Rémi se va de viaje junto a un músico callejero, y poco a poco descubre la verdad sobre sus orígenes y encuentra un verdadero hogar.',
        content_type: 'video',

        imdb_rating: 7.1,
        is_animation: false,
        type: 'movie',
        slogan: 'La soledad de la juventud no es como la de la vejez',

        genres: [1, 10, 15, 25, 36]
    },
    {
        id: 14,
        title: 'Bird Box. A ciegas',
        poster: 'movies/Bird Box.png',
        description: 'Tras la aparición de una amenaza invisible que hace que las personas se quiten la vida, Malorie intenta llevar a los niños a un lugar seguro sin poder abrir los ojos.',
        content_type: 'video',

        imdb_rating: 6.6,
        critics_rating: 64,
        is_animation: false,
        type: 'movie',
        slogan: 'No abras los ojos',

        genres: [1, 3, 7, 17, 37]
    },
    {
        id: 15,
        title: 'Amphibia',
        poster: 'cartoons/Amphibia.png',
        description: 'Anne cae en un extraño mundo de anfibios y poco a poco se acostumbra a su nueva vida, descubriendo la amistad, la responsabilidad y el crecimiento.',
        content_type: 'video',

        imdb_rating: 8.3,
        trailer_link: 'trailers/Amphibia.mp4',
        is_animation: true,
        type: 'series',
        slogan: 'Conviértete en un héroe',

        genres: [2, 9, 10, 23, 34]
    },
    {
        id: 16,
        title: 'Helluva Boss',
        poster: 'cartoons/Helluva Boss.png',
        description: 'Blitz dirige una pequeña empresa de asesinos a sueldo en el infierno, haciendo encargos en el mundo de los humanos y equilibrando constantemente entre el caos y el absurdo.',
        content_type: 'video',

        imdb_rating: 8.0,
        is_animation: true,
        type: 'series',
        slogan: 'Matamos personas para que tú no tengas que hacerlo',

        genres: [2, 3, 5, 32]
    },
    {
        id: 17,
        title: 'Hazbin Hotel',
        poster: 'cartoons/Hazbin Hotel.png',
        description: 'Charlie, la princesa del infierno, intenta crear un hotel para reformar demonios, dándoles una oportunidad de redención y cambiando el orden establecido.',
        content_type: 'video',

        imdb_rating: 7.6,
        critics_rating: 84,
        trailer_link: 'trailers/Hazbin Hotel.mp4',
        is_animation: true,
        type: 'series',
        slogan: 'Nunca sabes cómo terminará todo hasta que lo intentas',

        genres: [2, 9, 12, 33],

        parent_id: 16,         
        relation_type: 'spin_off',

        screenshots: [
            { image_path: "Hazbin Hotel/Vox.jpg", caption: "Vox" },
            { image_path: "Hazbin Hotel/Alastor.jpg", caption: "Alastor" },
            { image_path: "Hazbin Hotel/Valentino.jpg", caption: "Valentino" },
            { image_path: "Hazbin Hotel/Sir Pentious, Husk, Charlie Morningstar, Niffty, Angel Dust.jpg", caption: "Sir Pentious, Husk, Charlie Morningstar, Niffty, Angel Dust" },
            { image_path: "Hazbin Hotel/Charlie Morningstar, Vaggie, Egg Bois, Sir Pentious.jpg", caption: "Charlie Morningstar, Vaggie, Egg Bois, Sir Pentious" },
            { image_path: "Hazbin Hotel/Angel Dust, Husk.jpg", caption: "Angel Dust, Husk" },
            { image_path: "Hazbin Hotel/Niffty.jpg", caption: "Niffty" },
            { image_path: "Hazbin Hotel/Charlie Morningstar, Rosie, Alastor.jpg", caption: "Charlie Morningstar, Rosie, Alastor" },
            { image_path: "Hazbin Hotel/Charlie Morningstar.jpg", caption: "Charlie Morningstar" }
        ]
    },
    {
        id: 18,
        title: 'Robot Salvaje',
        poster: 'cartoons/The Wild Robot.png',
        description: 'El robot Roz queda varado en una isla desierta y aprende a sobrevivir en la naturaleza, mientras poco a poco empieza a conectar con el mundo vivo.',
        content_type: 'video',

        imdb_rating: 8.2,
        critics_rating: 97,
        is_animation: true,
        type: 'movie',
        slogan: 'A veces, para sobrevivir, debemos ser más de lo que fuimos programados para ser',

        genres: [1, 10, 15, 16, 40]
    },
    {
        id: 19,
        title: 'Zootopia',
        poster: 'cartoons/Zootopia.png',
        description: 'Judy Hopps, la primera coneja en la policía, se une al astuto zorro Nick Wilde para resolver un caso que amenaza a toda la ciudad.',
        content_type: 'video',

        imdb_rating: 8.0,
        critics_rating: 98,
        is_animation: true,
        type: 'movie',
        slogan: 'Cualquiera puede ser quien quiera ser',

        genres: [2, 4, 10, 23]
    },
    {
        id: 20,
        title: 'Zootopia 2',
        poster: 'cartoons/Zootopia 2.png',
        description: 'Judy y Nick se encargan de una nueva investigación que pone a prueba su confianza y pone en peligro el orden en Zootrópolis.',
        content_type: 'video',

        imdb_rating: 7.4,
        critics_rating: 91,
        trailer_link: 'trailers/Zootopia 2.mp4',
        is_animation: true,
        type: 'movie',
        slogan: '¿Por qué estarías dispuesto a morir?',

        genres: [2, 4, 10, 28],

        parent_id: 19,         
        relation_type: 'spin_off'
    },
    {
        id: 21,
        title: 'Mune: El guardián de la luna',
        poster: 'cartoons/Le Gardien de la Lune.png',
        description: 'En un mundo mágico donde el día y la noche son mantenidos por guardianes, el joven fauno Mune pierde accidentalmente el control de la Luna y se ve obligado a corregir su propio error.',
        content_type: 'video',

        imdb_rating: 7.1,
        critics_rating: 80,
        is_animation: true,
        type: 'movie',
        slogan: 'El equilibrio se pierde fácilmente',

        genres: [9, 10, 15, 34]
    },
    {
        id: 22,
        title: 'Coraline',
        poster: 'cartoons/Coraline.png',
        description: 'Coraline descubre un mundo oculto que parece una versión perfecta de su vida, pero detrás de esa apariencia atractiva se esconde una trampa peligrosa.',
        content_type: 'video',

        imdb_rating: 7.8,
        critics_rating: 91,
        is_animation: true,
        type: 'movie',
        slogan: 'Cuidado con tus deseos',

        genres: [7, 9, 10, 17],
        
        screenshots: [
            { image_path: "Coraline/Coraline, Charlie Jones.jpg", caption: "Coraline, Charlie Jones" },
            { image_path: "Coraline/Coraline, Other Parents.jpg", caption: "Coraline, Other Parents" },
            { image_path: "Coraline/Coraline, The Cat.jpg", caption: "Coraline, The Cat" },
            { image_path: "Coraline/Coraline.jpg", caption: "Coraline" },
            { image_path: "Coraline/Coraline-1.jpg", caption: "Coraline" },
            { image_path: "Coraline/Other Mother.jpg", caption: "Other Mother" },
            { image_path: "Coraline/Other Mother-1.jpg", caption: "Other Mother" },
            { image_path: "Coraline/The Cat.jpg", caption: "The Cat" },
            { image_path: "Coraline/Wyborne 'Wybie' Lovat.jpg", caption: "Wyborne 'Wybie' Lovat" }
        ]
    },
    {
        id: 23,
        title: 'Where the Crawdads Sing',
        poster: 'books/Where the Crawdads Sing.png',
        description: 'Kya Clark crece sola entre los pantanos y se convierte en la principal sospechosa de un asesinato, mientras su pasado revela poco a poco la verdad sobre la vida, el amor y la supervivencia.',
        type: 'book',

        genres: [1, 4, 16, 40]
    },
    {
        id: 24,
        title: "A Good Girl's Guide to Murder",
        poster: "books/A Good Girl's Guide to Murder.png",
        description: 'Pip Fitz-Amobi, una estudiante de secundaria, decide investigar un antiguo caso de asesinato para demostrar la inocencia del principal sospechoso, pero la investigación pronto se vuelve más peligrosa de lo que esperaba.',
        type: 'book',

        genres: [3, 4, 5, 35]
    },
    {
        id: 25,
        title: 'Good Girl, Bad Blood',
        poster: 'books/Good Girl Bad Blood.png',
        description: 'Pip intenta dejar las investigaciones en el pasado, pero la desaparición de una persona cercana la obliga a volver a un caso que conduce a secretos aún más oscuros.',
        type: 'book',

        genres: [3, 4, 5, 18],

        parent_id: 24,         
        relation_type: 'spin_off'
    },
    {
        id: 26,
        title: 'As Good as Dead',
        poster: 'books/As Good As Dead.png',
        description: 'Pip se encuentra en el centro de un peligroso juego donde la línea entre la vida y la muerte se vuelve cada vez más fina, y la verdad puede tener un precio demasiado alto.',
        type: 'book',

        genres: [1, 3, 4, 17, 35, 37],

        parent_id: 25,         
        relation_type: 'spin_off'
    },
    {
        id: 27,
        title: 'The Maze Runner',
        poster: 'books/The Maze Runner.png',
        description: 'Thomas despierta entre adolescentes atrapados junto a un gigantesco laberinto e intenta descubrir cómo escapar de la trampa y quién está detrás de todo.',
        type: 'book',

        genres: [3, 8, 10, 17, 22]
    },
    {
        id: 28,
        title: 'The Scorch Trials',
        poster: 'books/Maze Runner_ The Scorch Trials.png',
        description: 'Después de escapar del laberinto, Thomas y sus amigos llegan a un mundo devastado, donde nuevas pruebas revelan una verdad aún más cruel.',
        type: 'book',

        genres: [3, 6, 8, 38, 42]
    },
    {
        id: 29,
        title: 'The Death Cure',
        poster: 'books/Maze Runner_ The Death Cure.png',
        description: 'Thomas emprende una peligrosa misión para salvar a sus amigos y llegar al origen de los experimentos de los que depende el futuro de la humanidad.',
        type: 'book',

        genres: [1, 6, 8, 23]
    },
    {
        id: 30,
        title: 'Never Lie',
        poster: 'books/Never Lie.png',
        description: 'Una pareja se muda a la aislada casa de una psiquiatra desaparecida sin dejar rastro, y las grabaciones de sus sesiones comienzan a revelar una inquietante verdad.',
        type: 'book',

        genres: [1, 3, 4, 41]
    },
    {
        id: 31,
        title: 'The Teacher',
        poster: 'books/The Teacher.png',
        description: 'Entre una estudiante y su profesor surge una relación peligrosa, donde ambos esconden sus propios motivos y la verdad resulta ser muy diferente de lo que parece.',
        type: 'book',

        genres: [1, 3, 26, 31]
    },
    {
        id: 32,
        title: "Miss Peregrine's Home for Peculiar Children",
        poster: "books/Miss Peregrine's Home for Peculiar Children.png",
        description: 'Jacob llega a una misteriosa isla donde encuentra un hogar para niños con habilidades extraordinarias y descubre cuál es su lugar en esta historia.',
        type: 'book',

        genres: [1, 9, 10, 41, 46]
    },
    {
        id: 33,
        title: 'Hollow City',
        poster: 'books/Hollow City.png',
        description: 'Jacob y los niños peculiares emprenden un peligroso viaje para rescatar a su directora secuestrada y encontrar un lugar seguro.',
        type: 'book',

        genres: [3, 9, 10, 17, 36],

        parent_id: 32,         
        relation_type: 'spin_off'
    },
    {
        id: 34,
        title: 'Library of Souls',
        poster: 'books/Library of Souls.png',
        description: 'La batalla final obliga a Jacob y a sus amigos a enfrentarse a sus enemigos más peligrosos para salvar el mundo de los peculiares y a quienes aman.',
        type: 'book',

        genres: [1, 9, 10, 39],

        parent_id: 33,         
        relation_type: 'spin_off'
    },
    {
        id: 35,
        title: 'Sinners',
        poster: 'tracks cover/Sinners.png',
        type: 'track',

        origin_type: 'fanmade',
        audio: 'tracks/Sinners.mp3',
        duration: '2:23',

        parent_id: 17,         
        relation_type: 'soundtrack'
    },
    {
        id: 36,
        title: 'Poison',
        poster: 'tracks cover/Hazbin Hotel Soundtracks Season 1.png',
        type: 'track',

        origin_type: 'official',
        audio: 'tracks/Poison.mp3',
        duration: '2:07',

        parent_id: 17,         
        relation_type: 'soundtrack'
    },
    {
        id: 37,
        title: 'Overlords Rap',
        poster: 'tracks cover/Overlords Rap.png',
        type: 'track',

        origin_type: 'fanmade',
        audio: 'tracks/Overlords Rap.mp3',
        duration: '3:32',

        parent_id: 17,         
        relation_type: 'soundtrack'
    },
    {
        id: 38,
        title: 'Gravity',
        poster: 'tracks cover/Hazbin Hotel Soundtracks Season 2.png',
        type: 'track',

        origin_type: 'official',
        audio: 'tracks/Gravity.mp3',
        duration: '1:51',

        parent_id: 17,         
        relation_type: 'soundtrack'
    },
    {
        id: 39,
        title: 'Carolina',
        poster: 'tracks cover/Carolina.png',
        type: 'track',

        origin_type: 'official',
        audio: 'tracks/Carolina.mp3',
        duration: '4:24',

        parent_id: 23,         
        relation_type: 'soundtrack'
    },
    {
        id: 40,
        title: 'No Body, No Crime',
        poster: 'tracks cover/No Body No Crime.png',
        type: 'track',

        origin_type: 'official',
        audio: 'tracks/No Body, No Crime.mp3',
        duration: '3:35',

        parent_id: 24,         
        relation_type: 'soundtrack'
    }
];