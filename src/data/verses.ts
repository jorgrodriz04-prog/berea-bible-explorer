import type { ChapterContent } from "./types";

/**
 * Contenido bíblico de muestra (Reina-Valera, dominio público).
 * La estructura está lista para reemplazarse por una base de datos completa:
 * misma forma de datos -> misma UI, sin cambiar componentes.
 */
export const chapters: ChapterContent[] = [
  {
    bookId: "genesis",
    chapter: 1,
    verses: [
      { number: 1, text: "En el principio creó Dios los cielos y la tierra." },
      { number: 2, text: "Y la tierra estaba desordenada y vacía, y las tinieblas estaban sobre la faz del abismo, y el Espíritu de Dios se movía sobre la faz de las aguas." },
      { number: 3, text: "Y dijo Dios: Sea la luz; y fue la luz." },
      { number: 4, text: "Y vio Dios que la luz era buena; y separó Dios la luz de las tinieblas." },
      { number: 5, text: "Y llamó Dios a la luz Día, y a las tinieblas llamó Noche. Y fue la tarde y la mañana un día." },
      { number: 6, text: "Y dijo Dios: Haya expansión en medio de las aguas, y separe las aguas de las aguas." },
      { number: 7, text: "E hizo Dios la expansión, y separó las aguas que estaban debajo de la expansión, de las aguas que estaban sobre la expansión; y fue así." },
      { number: 8, text: "Y llamó Dios a la expansión Cielos. Y fue la tarde y la mañana el día segundo." },
      { number: 26, text: "Entonces dijo Dios: Hagamos al hombre a nuestra imagen, conforme a nuestra semejanza." },
      { number: 27, text: "Y creó Dios al hombre a su imagen, a imagen de Dios lo creó; varón y hembra los creó." },
    ],
  },
  {
    bookId: "genesis",
    chapter: 3,
    verses: [
      { number: 1, text: "Pero la serpiente era astuta, más que todos los animales del campo que Jehová Dios había hecho; la cual dijo a la mujer: ¿Conque Dios os ha dicho: No comáis de todo árbol del huerto?" },
      { number: 6, text: "Y vio la mujer que el árbol era bueno para comer, y que era agradable a los ojos, y árbol codiciable para alcanzar la sabiduría; y tomó de su fruto, y comió; y dio también a su marido, el cual comió así como ella." },
      { number: 15, text: "Y pondré enemistad entre ti y la mujer, y entre tu simiente y la simiente suya; ésta te herirá en la cabeza, y tú le herirás en el calcañar." },
      { number: 20, text: "Y llamó Adán el nombre de su mujer, Eva, por cuanto ella era madre de todos los vivientes." },
      { number: 21, text: "Y Jehová Dios hizo al hombre y a su mujer túnicas de pieles, y los vistió." },
    ],
  },
  {
    bookId: "josue",
    chapter: 6,
    verses: [
      { number: 1, text: "Pero Jericó estaba cerrada y bien guardada, por temor a los hijos de Israel; nadie entraba ni salía." },
      { number: 2, text: "Mas Jehová dijo a Josué: Mira, yo he entregado en tu mano a Jericó y a su rey, con sus varones de guerra." },
      { number: 16, text: "Y cuando los sacerdotes tocaron las bocinas la séptima vez, Josué dijo al pueblo: Gritad, porque Jehová os ha entregado la ciudad." },
      { number: 20, text: "Entonces el pueblo gritó, y los sacerdotes tocaron las bocinas; y el muro se derrumbó, y el pueblo subió a la ciudad, cada uno derecho hacia adelante, y la tomaron." },
    ],
  },
  {
    bookId: "job",
    chapter: 41,
    verses: [
      { number: 1, text: "¿Sacarás tú al leviatán con anzuelo, o con cuerda que le eches en su lengua?" },
      { number: 10, text: "Nadie hay tan osado que lo despierte; ¿quién, pues, podrá estar delante de mí?" },
      { number: 33, text: "No hay sobre la tierra quien se le parezca; animal hecho exento de temor." },
    ],
  },
  {
    bookId: "salmos",
    chapter: 23,
    verses: [
      { number: 1, text: "Jehová es mi pastor; nada me faltará." },
      { number: 2, text: "En lugares de delicados pastos me hará descansar; junto a aguas de reposo me pastoreará." },
      { number: 3, text: "Confortará mi alma; me guiará por sendas de justicia por amor de su nombre." },
      { number: 4, text: "Aunque ande en valle de sombra de muerte, no temeré mal alguno, porque tú estarás conmigo; tu vara y tu cayado me infundirán aliento." },
      { number: 5, text: "Aderezas mesa delante de mí en presencia de mis angustiadores; unges mi cabeza con aceite; mi copa está rebosando." },
      { number: 6, text: "Ciertamente el bien y la misericordia me seguirán todos los días de mi vida, y en la casa de Jehová moraré por largos días." },
    ],
  },
  {
    bookId: "salmos",
    chapter: 51,
    verses: [
      { number: 1, text: "Ten piedad de mí, oh Dios, conforme a tu misericordia; conforme a la multitud de tus piedades borra mis rebeliones." },
      { number: 10, text: "Crea en mí, oh Dios, un corazón limpio, y renueva un espíritu recto dentro de mí." },
      { number: 17, text: "Los sacrificios de Dios son el espíritu quebrantado; al corazón contrito y humillado no despreciarás tú, oh Dios." },
    ],
  },
  {
    bookId: "isaias",
    chapter: 53,
    verses: [
      { number: 4, text: "Ciertamente llevó él nuestras enfermedades, y sufrió nuestros dolores; y nosotros le tuvimos por azotado, por herido de Dios y abatido." },
      { number: 5, text: "Mas él herido fue por nuestras rebeliones, molido por nuestros pecados; el castigo de nuestra paz fue sobre él, y por su llaga fuimos nosotros curados." },
      { number: 6, text: "Todos nosotros nos descarriamos como ovejas, cada cual se apartó por su camino; mas Jehová cargó en él el pecado de todos nosotros." },
    ],
  },
  {
    bookId: "jeremias",
    chapter: 31,
    verses: [
      { number: 31, text: "He aquí que vienen días, dice Jehová, en los cuales haré nuevo pacto con la casa de Israel y con la casa de Judá." },
      { number: 33, text: "Pondré mi ley en su mente, y la escribiré en su corazón; y yo seré a ellos por Dios, y ellos me serán por pueblo." },
      { number: 34, text: "Porque perdonaré la maldad de ellos, y no me acordaré más de su pecado." },
    ],
  },
  {
    bookId: "mateo",
    chapter: 25,
    verses: [
      { number: 1, text: "Entonces el reino de los cielos será semejante a diez vírgenes que tomando sus lámparas, salieron a recibir al esposo." },
      { number: 2, text: "Cinco de ellas eran prudentes y cinco insensatas." },
      { number: 3, text: "Las insensatas, tomando sus lámparas, no tomaron consigo aceite." },
      { number: 4, text: "Mas las prudentes tomaron aceite en sus vasijas, juntamente con sus lámparas." },
      { number: 5, text: "Y tardándose el esposo, cabecearon todas y se durmieron." },
      { number: 6, text: "Y a la medianoche se oyó un clamor: ¡Aquí viene el esposo; salid a recibirle!" },
      { number: 10, text: "Pero mientras ellas iban a comprar, vino el esposo; y las que estaban preparadas entraron con él a las bodas; y se cerró la puerta." },
      { number: 13, text: "Velad, pues, porque no sabéis el día ni la hora en que el Hijo del Hombre ha de venir." },
    ],
  },
  {
    bookId: "juan",
    chapter: 3,
    verses: [
      { number: 3, text: "Respondió Jesús y le dijo: De cierto, de cierto te digo, que el que no naciere de nuevo, no puede ver el reino de Dios." },
      { number: 14, text: "Y como Moisés levantó la serpiente en el desierto, así es necesario que el Hijo del Hombre sea levantado." },
      { number: 16, text: "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna." },
      { number: 17, text: "Porque no envió Dios a su Hijo al mundo para condenar al mundo, sino para que el mundo sea salvo por él." },
    ],
  },
  {
    bookId: "romanos",
    chapter: 8,
    verses: [
      { number: 1, text: "Ahora, pues, ninguna condenación hay para los que están en Cristo Jesús." },
      { number: 28, text: "Y sabemos que a los que aman a Dios, todas las cosas les ayudan a bien, esto es, a los que conforme a su propósito son llamados." },
      { number: 31, text: "¿Qué, pues, diremos a esto? Si Dios es por nosotros, ¿quién contra nosotros?" },
      { number: 38, text: "Por lo cual estoy seguro de que ni la muerte, ni la vida, ni ángeles, ni principados, ni lo presente, ni lo por venir," },
      { number: 39, text: "ni lo alto, ni lo profundo, ni ninguna otra cosa creada nos podrá separar del amor de Dios, que es en Cristo Jesús Señor nuestro." },
    ],
  },
  {
    bookId: "1-corintios",
    chapter: 13,
    verses: [
      { number: 1, text: "Si yo hablase lenguas humanas y angélicas, y no tengo amor, vengo a ser como metal que resuena, o címbalo que retiñe." },
      { number: 4, text: "El amor es sufrido, es benigno; el amor no tiene envidia, el amor no es jactancioso, no se envanece." },
      { number: 7, text: "Todo lo sufre, todo lo cree, todo lo espera, todo lo soporta." },
      { number: 13, text: "Y ahora permanecen la fe, la esperanza y el amor, estos tres; pero el mayor de ellos es el amor." },
    ],
  },
  {
    bookId: "efesios",
    chapter: 2,
    verses: [
      { number: 8, text: "Porque por gracia sois salvos por medio de la fe; y esto no de vosotros, pues es don de Dios." },
      { number: 9, text: "No por obras, para que nadie se gloríe." },
      { number: 10, text: "Porque somos hechura suya, creados en Cristo Jesús para buenas obras, las cuales Dios preparó de antemano para que anduviésemos en ellas." },
    ],
  },
  {
    bookId: "hebreos",
    chapter: 11,
    verses: [
      { number: 1, text: "Es, pues, la fe la certeza de lo que se espera, la convicción de lo que no se ve." },
      { number: 3, text: "Por la fe entendemos haber sido constituido el universo por la palabra de Dios." },
      { number: 6, text: "Pero sin fe es imposible agradar a Dios; porque es necesario que el que se acerca a Dios crea que le hay, y que es galardonador de los que le buscan." },
      { number: 30, text: "Por la fe cayeron los muros de Jericó después de rodearlos siete días." },
    ],
  },
  {
    bookId: "hechos",
    chapter: 17,
    verses: [
      { number: 10, text: "Inmediatamente los hermanos enviaron de noche a Pablo y a Silas hasta Berea; y ellos, habiendo llegado, entraron en la sinagoga de los judíos." },
      { number: 11, text: "Y éstos eran más nobles que los que estaban en Tesalónica, pues recibieron la palabra con toda solicitud, escudriñando cada día las Escrituras para ver si estas cosas eran así." },
    ],
  },
  {
    bookId: "apocalipsis",
    chapter: 21,
    verses: [
      { number: 1, text: "Vi un cielo nuevo y una tierra nueva; porque el primer cielo y la primera tierra pasaron, y el mar ya no existía más." },
      { number: 3, text: "Y oí una gran voz del cielo que decía: He aquí el tabernáculo de Dios con los hombres, y él morará con ellos; y ellos serán su pueblo, y Dios mismo estará con ellos como su Dios." },
      { number: 4, text: "Enjugará Dios toda lágrima de los ojos de ellos; y ya no habrá muerte, ni habrá más llanto, ni clamor, ni dolor; porque las primeras cosas pasaron." },
    ],
  },
  {
    bookId: "genesis",
    chapter: 15,
    verses: [
      { number: 1, text: "Después de estas cosas vino la palabra de Jehová a Abram en visión, diciendo: No temas, Abram; yo soy tu escudo, y tu galardón será sobremanera grande." },
      { number: 5, text: "Y lo llevó fuera, y le dijo: Mira ahora los cielos, y cuenta las estrellas, si las puedes contar. Y le dijo: Así será tu descendencia." },
      { number: 6, text: "Y creyó a Jehová, y le fue contado por justicia." },
      { number: 18, text: "En aquel día hizo Jehová un pacto con Abram, diciendo: A tu descendencia daré esta tierra." },
    ],
  },
  {
    bookId: "exodo",
    chapter: 20,
    verses: [
      { number: 1, text: "Y habló Dios todas estas palabras, diciendo:" },
      { number: 2, text: "Yo soy Jehová tu Dios, que te saqué de la tierra de Egipto, de casa de servidumbre." },
      { number: 3, text: "No tendrás dioses ajenos delante de mí." },
      { number: 8, text: "Acuérdate del día de reposo para santificarlo." },
      { number: 12, text: "Honra a tu padre y a tu madre, para que tus días se alarguen en la tierra que Jehová tu Dios te da." },
    ],
  },
  {
    bookId: "levitico",
    chapter: 19,
    verses: [
      { number: 2, text: "Habla a toda la congregación de los hijos de Israel, y diles: Santos seréis, porque santo soy yo Jehová vuestro Dios." },
      { number: 9, text: "Cuando segéis la mies de vuestra tierra, no segaréis hasta el último rincón de ella, ni espigarás tu tierra segada." },
      { number: 10, text: "Y no rebuscarás tu viña, ni recogerás las uvas caídas; para el pobre y para el extranjero lo dejarás." },
      { number: 18, text: "No te vengarás, ni guardarás rencor a los hijos de tu pueblo, sino amarás a tu prójimo como a ti mismo. Yo Jehová." },
    ],
  },
  {
    bookId: "josue",
    chapter: 2,
    verses: [
      { number: 1, text: "Josué hijo de Nun envió desde Sitim dos espías secretamente, diciéndoles: Andad, reconoced la tierra, y a Jericó. Y ellos fueron, y entraron en casa de una mujer ramera que se llamaba Rahab, y posaron allí." },
      { number: 11, text: "Oyendo esto, ha desmayado nuestro corazón; porque Jehová vuestro Dios es Dios arriba en los cielos y abajo en la tierra." },
    ],
  },
  {
    bookId: "proverbios",
    chapter: 1,
    verses: [
      { number: 7, text: "El principio de la sabiduría es el temor de Jehová; los insensatos desprecian la sabiduría y la enseñanza." },
    ],
  },
  {
    bookId: "isaias",
    chapter: 6,
    verses: [
      { number: 3, text: "Y el uno al otro daba voces, diciendo: Santo, santo, santo, Jehová de los ejércitos; toda la tierra está llena de su gloria." },
      { number: 8, text: "Después oí la voz del Señor, que decía: ¿A quién enviaré, y quién irá por nosotros? Entonces respondí yo: Heme aquí, envíame a mí." },
    ],
  },
  {
    bookId: "mateo",
    chapter: 22,
    verses: [
      { number: 37, text: "Jesús le dijo: Amarás al Señor tu Dios con todo tu corazón, y con toda tu alma, y con toda tu mente." },
      { number: 38, text: "Este es el primero y grande mandamiento." },
      { number: 39, text: "Y el segundo es semejante: Amarás a tu prójimo como a ti mismo." },
      { number: 40, text: "De estos dos mandamientos depende toda la ley y los profetas." },
    ],
  },
  {
    bookId: "juan",
    chapter: 13,
    verses: [
      { number: 34, text: "Un mandamiento nuevo os doy: Que os améis unos a otros; como yo os he amado, que también os améis unos a otros." },
      { number: 35, text: "En esto conocerán todos que sois mis discípulos, si tuviereis amor los unos con los otros." },
    ],
  },
  {
    bookId: "romanos",
    chapter: 5,
    verses: [
      { number: 1, text: "Justificados, pues, por la fe, tenemos paz para con Dios por medio de nuestro Señor Jesucristo." },
      { number: 8, text: "Mas Dios muestra su amor para con nosotros, en que siendo aún pecadores, Cristo murió por nosotros." },
      { number: 12, text: "Por tanto, como el pecado entró en el mundo por un hombre, y por el pecado la muerte, así la muerte pasó a todos los hombres." },
    ],
  },
  {
    bookId: "1-juan",
    chapter: 4,
    verses: [
      { number: 8, text: "El que no ama, no ha conocido a Dios; porque Dios es amor." },
      { number: 9, text: "En esto se mostró el amor de Dios para con nosotros, en que Dios envió a su Hijo unigénito al mundo, para que vivamos por él." },
      { number: 10, text: "En esto consiste el amor: no en que nosotros hayamos amado a Dios, sino en que él nos amó a nosotros, y envió a su Hijo en propiciación por nuestros pecados." },
    ],
  },
  {
    bookId: "hebreos",
    chapter: 8,
    verses: [
      { number: 6, text: "Pero ahora tanto mejor ministerio es el suyo, cuanto es mediador de un mejor pacto, establecido sobre mejores promesas." },
    ],
  },
  {
    bookId: "1-corintios",
    chapter: 15,
    verses: [
      { number: 3, text: "Porque primeramente os he enseñado lo que asimismo recibí: Que Cristo murió por nuestros pecados, conforme a las Escrituras;" },
      { number: 4, text: "y que fue sepultado, y que resucitó al tercer día, conforme a las Escrituras;" },
    ],
  },
  {
    bookId: "lucas",
    chapter: 22,
    verses: [
      { number: 20, text: "De igual manera, después que hubo cenado, tomó la copa, diciendo: Esta copa es el nuevo pacto en mi sangre, que por vosotros se derrama." },
    ],
  },
];

export const getChapter = (bookId: string, chapter: number) =>
  chapters.find((c) => c.bookId === bookId && c.chapter === chapter);

export const availableChapters = (bookId: string) =>
  chapters.filter((c) => c.bookId === bookId).map((c) => c.chapter);
