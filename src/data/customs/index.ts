import type { Custom } from "../types";

/**
 * Costumbres y contexto cultural. Cada entrada separa siempre:
 * 1) lo que afirma la Biblia, 2) el contexto histórico/cultural,
 * 3) la interpretación. Una reconstrucción histórica nunca se presenta
 * como mandato bíblico.
 */
export const customs: Custom[] = [
  {
    id: "bodas-judias",
    name: "Bodas judías del siglo I",
    aliases: ["matrimonio", "boda", "esposo", "desposorio"],
    area: "matrimonio",
    summary: "Compromiso, cortejo nocturno y fiesta prolongada en la casa del novio.",
    biblical:
      "Mateo 25 describe vírgenes que salen a recibir al esposo con lámparas, un esposo que se retarda y una puerta que se cierra al comenzar las bodas. Juan 2 muestra una fiesta de varios días con provisión de vino.",
    historical:
      "El matrimonio tenía dos etapas: desposorio (compromiso legal) y traslado de la novia. El cortejo podía ocurrir de noche y la hora exacta no se anunciaba, por lo que las lámparas de aceite eran indispensables.",
    interpretation:
      "Interpretación frecuente: la espera del esposo ilustra la expectativa de la venida de Cristo. El texto no explica cada detalle como alegoría.",
    refs: ["Mateo 25:1-13", "Juan 2:1-10"],
    people: ["jesus"],
    events: ["segunda-venida"],
    terms: ["reino-de-dios"],
    sources: ["biblia-rv", "contexto-cultural-general", "interpretaciones-comunes"],
  },
  {
    id: "pascua",
    name: "La Pascua",
    aliases: ["pesaj", "fiesta de los panes sin levadura"],
    area: "fiestas",
    summary: "Fiesta que recuerda la salida de Egipto y la protección por la sangre del cordero.",
    biblical:
      "Éxodo 12 manda tomar un cordero sin defecto, poner su sangre en las puertas y comer con panes sin levadura; la fiesta debía repetirse cada año como memorial.",
    historical:
      "En el siglo I la Pascua reunía multitudes en Jerusalén y los corderos se sacrificaban en el templo.",
    interpretation:
      "Interpretación: el Nuevo Testamento relaciona el cordero pascual con Cristo (1 Corintios 5:7); el alcance de esa relación se entiende de distintas maneras.",
    refs: ["Éxodo 12:31", "Levítico 23:5", "Lucas 22:20", "1 Corintios 5:7"],
    people: ["moises", "jesus"],
    places: ["egipto", "jerusalen"],
    events: ["exodo"],
    terms: ["expiacion"],
    sources: ["biblia-rv", "contexto-historico-general", "interpretaciones-comunes"],
  },
  {
    id: "dia-expiacion",
    name: "Día de la expiación",
    aliases: ["yom kipur", "kipur"],
    area: "culto",
    summary: "Día anual de ayuno en que el sumo sacerdote entraba al lugar santísimo.",
    biblical:
      "Levítico 16 ordena un rito anual con dos cabras, sangre llevada al lugar santísimo y afligir el alma; ese día se hacía expiación por todo el pueblo.",
    historical:
      "Era el único día del año en que el sumo sacerdote entraba al lugar santísimo, y quedó como la fiesta más solemne del calendario israelita.",
    refs: ["Levítico 16:30", "Hebreos 9:7"],
    terms: ["expiacion", "santidad"],
    customs: [],
    sources: ["biblia-rv", "contexto-cultural-general"],
  },
  {
    id: "templo",
    name: "El templo y su culto",
    aliases: ["tabernaculo", "sacerdotes", "sacrificios"],
    area: "culto",
    summary: "Centro del culto israelita: sacrificios, sacerdocio y presencia de Dios.",
    biblical:
      "El tabernáculo y luego el templo son descritos como el lugar donde Dios pone su nombre; los sacerdotes ofrecían sacrificios diarios y guardaban el orden del culto.",
    historical:
      "El segundo templo, ampliado por Herodes, funcionaba también como centro económico y de peregrinación, con patios separados para gentiles, mujeres e israelitas.",
    refs: ["Éxodo 40:34", "1 Reyes 8:10-11", "Lucas 2:46"],
    people: ["salomon", "jesus"],
    places: ["jerusalen"],
    terms: ["santidad", "expiacion"],
    sources: ["biblia-rv", "contexto-historico-general"],
  },
  {
    id: "duelo-funerales",
    name: "Duelo y sepultura",
    aliases: ["funerales", "luto", "sepultura", "plañideras"],
    area: "duelo",
    summary: "Rasgar vestidos, ceniza, lamento público y sepultura el mismo día.",
    biblical:
      "El texto menciona rasgar los vestidos, vestir cilicio, poner ceniza y llorar por días determinados; también sepulturas en cuevas o sepulcros nuevos.",
    historical:
      "Se contrataban plañideras y músicos; el clima hacía habitual sepultar el mismo día, y un año después los huesos podían trasladarse a un osario.",
    interpretation:
      "Interpretación: algunos ven en la sepultura en sepulcro nuevo de Jesús un cumplimiento de Isaías 53:9.",
    refs: ["Génesis 37:34", "2 Samuel 3:31", "Juan 11:31", "Mateo 27:60"],
    people: ["david", "jesus"],
    sources: ["biblia-rv", "contexto-cultural-general", "interpretaciones-comunes"],
  },
  {
    id: "agricultura",
    name: "Agricultura y cosecha",
    aliases: ["siembra", "siega", "vid", "era", "espigar"],
    area: "agricultura",
    summary: "Ciclo de lluvias, siembra y siega que da imágenes a muchos textos bíblicos.",
    biblical:
      "La ley manda no segar los rincones del campo ni rebuscar, dejándolo para el pobre y el extranjero; parábolas y profetas usan la siembra, la vid y la era como imágenes.",
    historical:
      "El año agrícola dependía de las lluvias tempranas y tardías; la trilla se hacía en eras al aire libre y las fiestas principales coincidían con las cosechas.",
    refs: ["Levítico 19:9-10", "Deuteronomio 11:14", "Mateo 13:3", "Rut 2:3"],
    sources: ["biblia-rv", "contexto-cultural-general"],
  },
  {
    id: "monedas-medidas",
    name: "Monedas, pesos y medidas",
    aliases: ["denario", "siclo", "talento", "codo", "efa"],
    area: "medidas",
    summary: "Equivalencias aproximadas del dinero y las medidas mencionadas en la Biblia.",
    biblical:
      "El texto menciona siclos, denarios, talentos, codos y efas, y manda usar pesas y medidas justas.",
    historical:
      "Un denario equivalía aproximadamente al jornal de un día; el codo medía cerca de 45 cm. Las equivalencias son aproximadas y variaron según época y región.",
    interpretation:
      "Interpretación: las conversiones a moneda actual son estimaciones, no datos del texto bíblico.",
    refs: ["Levítico 19:35-36", "Mateo 20:2", "Mateo 25:15"],
    sources: ["biblia-rv", "contexto-historico-general"],
  },
  {
    id: "vestimenta",
    name: "Vestimenta",
    aliases: ["manto", "tunica", "cilicio", "sandalias", "franjas"],
    area: "vestimenta",
    summary: "Túnica, manto y señales visibles de duelo, dignidad o consagración.",
    biblical:
      "Se mencionan túnica y manto, el manto como prenda que no debía retenerse en prenda de noche, franjas en los bordes del vestido como recordatorio de los mandamientos y el cilicio en el duelo.",
    historical:
      "El manto servía también de abrigo nocturno, por lo que retenerlo dejaba al pobre sin cobija.",
    refs: ["Éxodo 22:26-27", "Números 15:38", "Juan 19:23"],
    terms: ["santidad"],
    sources: ["biblia-rv", "contexto-cultural-general"],
  },
  {
    id: "familia-patriarcal",
    name: "Estructura familiar y herencia",
    aliases: ["primogenito", "casa paterna", "genealogia", "clan"],
    area: "familia",
    summary: "La casa paterna como unidad social, con primogenitura y herencia de la tierra.",
    biblical:
      "El texto ordena una doble porción para el primogénito, regula la herencia de la tierra por tribus y conserva genealogías extensas.",
    historical:
      "Varias generaciones convivían en la casa paterna; la tierra se consideraba herencia familiar inalienable, lo que explica episodios como el de la viña de Nabot.",
    refs: ["Deuteronomio 21:17", "Números 27:8-11", "1 Reyes 21:3", "Mateo 1:2"],
    people: ["judah", "david"],
    sources: ["biblia-rv", "contexto-cultural-general"],
  },
  {
    id: "sinagoga",
    name: "La sinagoga",
    aliases: ["sinagogas", "lectura publica", "escribas"],
    area: "instituciones",
    summary: "Reunión local para leer y explicar las Escrituras.",
    biblical:
      "Jesús y Pablo entran en sinagogas a leer y enseñar; en Berea los oyentes escudriñaban cada día las Escrituras para comprobar lo enseñado.",
    historical:
      "La sinagoga funcionaba como escuela y tribunal local; se leía la ley y los profetas y se invitaba a los visitantes a exponer.",
    refs: ["Lucas 4:16", "Hechos 17:10-11"],
    people: ["jesus", "pablo"],
    places: ["berea", "nazaret"],
    sources: ["biblia-rv", "contexto-historico-general"],
  },
];

export const getCustom = (id: string) => customs.find((c) => c.id === id);
