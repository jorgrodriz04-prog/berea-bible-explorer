import type { Study } from "../types";

/**
 * Estudios bíblicos. Para agregar un estudio nuevo basta con añadir un objeto
 * a este arreglo (o cargarlo luego desde la base de datos con la misma forma):
 * la lista, la ruta /estudios/$slug y el buscador lo toman automáticamente.
 */
export const studies: Study[] = [
  {
    slug: "la-fe-que-agrada-a-dios",
    title: "La fe que agrada a Dios",
    topic: "fe",
    minutes: 8,
    introduction:
      "La Escritura no presenta la fe como un sentimiento optimista, sino como una certeza fundada en el carácter de Dios. Hebreos 11 define la fe y luego la ilustra con la vida de hombres y mujeres que actuaron confiando en promesas que aún no veían.",
    keyVerses: ["Hebreos 11:1", "Hebreos 11:6", "Efesios 2:8", "Romanos 8:28"],
    sections: [
      {
        heading: "Definición bíblica",
        body: "«Es, pues, la fe la certeza de lo que se espera, la convicción de lo que no se ve» (Hebreos 11:1). Certeza y convicción son términos firmes: la fe descansa en la palabra dada por Dios, no en la capacidad del creyente.",
      },
      {
        heading: "La fe se demuestra en obediencia",
        body: "Noé construyó, Abraham salió, Israel rodeó Jericó. En cada caso la fe produjo una acción concreta. Santiago lo resume: la fe sin obras es muerta, no porque las obras salven, sino porque la fe verdadera obra.",
      },
      {
        heading: "La fe es don, no mérito",
        body: "Efesios 2:8-9 corta cualquier orgullo: somos salvos por gracia mediante la fe, y esto no de nosotros. La fe es el instrumento, la gracia es la fuente.",
      },
    ],
    historicalContext:
      "Hebreos fue escrita a creyentes de trasfondo judío tentados a volver al sistema del templo ante la presión y la persecución. El autor los anima mostrando que los héroes del Antiguo Testamento vivieron mirando hacia adelante, no hacia atrás.",
    people: ["abraham", "noe", "josue"],
    places: ["jerico"],
    crossRefs: ["Hebreos 11:30", "Santiago 2:17", "Gálatas 2:20"],
    events: ["caida-jerico", "diluvio"],
    terms: ["justicia", "pacto-termino"],
    categories: ["fe", "doctrina"],
    sources: ["biblia-rv", "estudio-berea"],
    conclusion:
      "Agradar a Dios no comienza con esfuerzo, sino con confianza: creer que Él existe y que recompensa a quienes le buscan. Esa confianza, luego, se traduce en una vida obediente.",
  },
  {
    slug: "el-perdon-que-restaura",
    title: "El perdón que restaura",
    topic: "perdon",
    minutes: 7,
    introduction:
      "El perdón bíblico no minimiza el pecado: lo enfrenta y lo cubre. El Salmo 51, escrito por David tras su gran caída, muestra el camino del quebrantamiento a la restauración.",
    keyVerses: ["Salmos 51:1", "Salmos 51:10", "Jeremías 31:34", "Efesios 4:32"],
    sections: [
      { heading: "Confesión sin excusas", body: "David no negocia con Dios: reconoce sus rebeliones y pide misericordia conforme a la multitud de las piedades divinas. El perdón comienza cuando dejamos de justificarnos." },
      { heading: "Un corazón nuevo", body: "La petición central no es solo alivio de la culpa, sino transformación: «Crea en mí, oh Dios, un corazón limpio». Dios perdona y además renueva." },
      { heading: "Perdonar como fuimos perdonados", body: "En el nuevo pacto Dios promete no acordarse más del pecado (Jeremías 31:34). Quien ha recibido semejante perdón está llamado a extenderlo." },
    ],
    historicalContext:
      "En el mundo antiguo el rey estaba sobre la ley; el Salmo 51 es notable porque un monarca se somete públicamente al juicio de Dios y lo deja escrito para el culto del pueblo.",
    people: ["david", "jesus"],
    places: ["jerusalen"],
    crossRefs: ["Mateo 6:14", "1 Juan 1:9", "Lucas 15:20"],
    terms: ["expiacion", "justicia"],
    customs: ["dia-expiacion"],
    laws: ["sacrificios"],
    categories: ["perdon", "vida cristiana"],
    sources: ["biblia-rv", "contexto-historico-general", "estudio-berea"],
    conclusion:
      "El perdón de Dios es completo y creativo: borra la culpa y forma un corazón nuevo capaz de perdonar a otros.",
  },
  {
    slug: "el-pacto-de-dios",
    title: "El pacto de Dios con su pueblo",
    topic: "pacto",
    minutes: 10,
    introduction:
      "La Biblia se organiza en torno a pactos: acuerdos que Dios establece por iniciativa propia, con promesas, señales y consecuencias. Entender los pactos ordena toda la historia bíblica.",
    keyVerses: ["Génesis 15:18", "Éxodo 19:5", "Jeremías 31:31", "Hebreos 8:6"],
    sections: [
      { heading: "Pacto con Abraham", body: "Dios promete descendencia, tierra y bendición para todas las naciones. Abraham cree y le es contado por justicia (Génesis 15:6)." },
      { heading: "Pacto en el Sinaí", body: "Israel es constituido pueblo de Dios con la ley como norma de vida. Muestra la santidad divina y la incapacidad humana de cumplirla perfectamente." },
      { heading: "Nuevo pacto", body: "Jeremías 31 anuncia una ley escrita en el corazón y un perdón definitivo. Cristo lo establece con su sangre; Hebreos lo llama mejor pacto sobre mejores promesas." },
    ],
    historicalContext:
      "Los pactos bíblicos siguen la forma de los tratados del Cercano Oriente antiguo: preámbulo, historia, estipulaciones, señales y testigos. El lector original reconocía esa estructura legal.",
    people: ["abraham", "moises", "jesus"],
    places: ["sinai", "jerusalen"],
    crossRefs: ["Lucas 22:20", "Romanos 4:3", "Hebreos 9:15"],
    events: ["exodo", "cautividad"],
    terms: ["pacto-termino", "mesias"],
    laws: ["diez-mandamientos"],
    categories: ["pacto", "teologia biblica"],
    sources: ["biblia-rv", "contexto-cultural-general", "estudio-berea"],
    conclusion:
      "La historia bíblica no es una serie de episodios aislados, sino el desarrollo de un pacto que culmina en Cristo y en un pueblo con la ley escrita en el corazón.",
  },
  {
    slug: "salvacion-por-gracia",
    title: "Salvación por gracia mediante la fe",
    topic: "salvacion",
    minutes: 9,
    introduction:
      "¿Cómo es salvo el ser humano? La respuesta bíblica es consistente: por iniciativa y obra de Dios, recibida por fe, no por mérito propio.",
    keyVerses: ["Juan 3:16", "Efesios 2:8-9", "Isaías 53:5", "Romanos 8:1"],
    sections: [
      { heading: "El problema: el pecado", body: "Desde Génesis 3 la humanidad está separada de Dios. Isaías 53:6 lo resume: todos nos descarriamos como ovejas." },
      { heading: "La provisión: el sustituto", body: "«Mas él herido fue por nuestras rebeliones». La cruz no es un accidente, es sustitución anunciada siglos antes." },
      { heading: "La respuesta: creer", body: "Juan 3:16 pone la condición en creer, no en logros. Efesios 2:10 añade el resultado: buenas obras preparadas por Dios para el ya salvado." },
    ],
    historicalContext:
      "Pablo escribe a Éfeso, ciudad de cultos mistéricos donde la salvación se compraba con ritos y pagos. El evangelio de la gracia era radicalmente distinto de su entorno religioso.",
    people: ["jesus", "pablo"],
    places: ["jerusalen"],
    crossRefs: ["Tito 3:5", "Romanos 5:8", "Hechos 4:12"],
    events: ["crucifixion"],
    terms: ["evangelio", "expiacion", "justicia"],
    categories: ["salvacion", "doctrina"],
    sources: ["biblia-rv", "contexto-historico-general", "estudio-berea"],
    conclusion:
      "La gracia excluye el orgullo y produce gratitud: el creyente no trabaja para ser salvo, sino porque ha sido salvado.",
  },
  {
    slug: "las-diez-virgenes",
    title: "Las diez vírgenes: velar con aceite",
    topic: "vigilancia",
    minutes: 8,
    introduction:
      "Mateo 25 recoge una parábola sobre la espera del esposo. Diez jóvenes esperan, todas con lámparas; la diferencia está en la previsión del aceite.",
    keyVerses: ["Mateo 25:1-4", "Mateo 25:10", "Mateo 25:13"],
    sections: [
      { heading: "Todas parecían iguales", body: "Las diez salen a recibir al esposo y todas se duermen. Externamente no había diferencia visible; la distinción estaba en la reserva personal." },
      { heading: "El aceite no se presta", body: "En el momento decisivo lo que no se preparó no puede pedirse prestado. La fe personal no es transferible." },
      { heading: "Velad", body: "La conclusión no es calcular fechas, sino vivir preparado: «no sabéis el día ni la hora»." },
    ],
    historicalContext:
      "En las bodas judías del siglo I el novio llegaba a buscar a la novia en un cortejo nocturno cuya hora exacta no se anunciaba; las lámparas de aceite eran indispensables y el retraso era común.",
    people: ["jesus"],
    places: ["jerusalen"],
    crossRefs: ["Lucas 12:35", "1 Tesalonicenses 5:6", "Apocalipsis 19:7"],
    events: ["segunda-venida"],
    terms: ["reino-de-dios"],
    customs: ["bodas-judias"],
    categories: ["vigilancia", "parabolas"],
    sources: ["biblia-rv", "contexto-cultural-general", "estudio-berea"],
    interpretations: [
      { view: "El aceite representa la fe personal y viva del creyente.", basis: "Interpretación: el texto no identifica el aceite; se deduce del contraste entre prudentes e insensatas." },
      { view: "El aceite representa la obra del Espíritu Santo en el creyente.", basis: "Interpretación: se apoya en el uso del aceite como símbolo del Espíritu en otros pasajes, no en Mateo 25." },
    ],
    conclusion:
      "La vigilancia cristiana es una fe provista y constante, no un entusiasmo momentáneo.",
  },
  {
    slug: "jerico-y-la-obediencia",
    title: "Jericó: cuando la obediencia derriba muros",
    topic: "fe",
    minutes: 6,
    introduction:
      "La primera batalla de Israel en Canaán se gana sin estrategia militar. Dios pide un acto aparentemente absurdo: caminar en silencio alrededor de una ciudad fortificada.",
    keyVerses: ["Josué 6:2", "Josué 6:20", "Hebreos 11:30"],
    sections: [
      { heading: "La promesa antes de la victoria", body: "«Yo he entregado en tu mano a Jericó» (Josué 6:2). Dios habla en pasado de algo aún no ocurrido: la fe se apoya en lo dicho." },
      { heading: "Seis días de silencio", body: "La prueba no fue el séptimo día, sino los seis anteriores sin resultados visibles." },
      { heading: "El grito y el muro", body: "La ciudad cae por la palabra de Dios y la obediencia del pueblo, no por la fuerza del ejército." },
    ],
    historicalContext:
      "Jericó era una plaza clave del valle del Jordán, con muros dobles y acceso al agua. Militarmente, un asedio prolongado era la única opción humana razonable.",
    people: ["josue", "rahab"],
    places: ["jerico"],
    crossRefs: ["2 Corintios 10:4", "1 Samuel 15:22"],
    events: ["caida-jerico"],
    terms: ["pacto-termino"],
    categories: ["fe", "obediencia"],
    sources: ["biblia-rv", "contexto-historico-general", "estudio-berea"],
    conclusion:
      "Dios suele pedir obediencia antes de mostrar resultados; los muros caen cuando el pueblo confía más en su palabra que en la evidencia.",
  },
];

export const getStudy = (slug: string) => studies.find((s) => s.slug === slug);
