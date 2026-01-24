import { X } from "lucide-react";
import { useEffect } from "react";

interface LegalModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function LegalModal({ isOpen, onClose }: LegalModalProps) {
    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="relative w-full max-w-4xl max-h-[80vh] overflow-hidden rounded-2xl border border-white/20 bg-[#1a1a1a] shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/10 p-4 bg-white/5">
                    <h2 className="text-xl font-bold text-white">AVISO LEGAL Y CONDICIONES GENERALES DE USO</h2>
                    <button
                        onClick={onClose}
                        className="rounded-full p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="overflow-y-auto p-6 text-sm text-white/80 space-y-4 max-h-[calc(80vh-80px)]">
                    <p className="text-xs text-white/50">www.pinturaexpress.org</p>

                    <h3 className="text-lg font-bold text-primary mt-6">I. INFORMACIÓN GENERAL</h3>
                    <p>
                        En cumplimiento con el deber de información dispuesto en la Ley 34/2002 de Servicios de la Sociedad de la Información y el Comercio Electrónico (LSSI-CE) de 11 de julio, se facilitan a continuación los siguientes datos de información general de este sitio web:
                    </p>
                    <p>
                        La titularidad de este sitio web, Pinturaexpress, (www.pinturaexpress.org) la ostenta: Marc Xicola Tugas, con NIF: 52172995w, y cuyos datos de contacto son:<br />
                        Dirección: C/Pau Claris 15. baixos. 08100 Mollet del Vallès<br />
                        Teléfono de contacto: 622566385<br />
                        Email de contacto: expresscarbono@gmail.com
                    </p>

                    <h3 className="text-lg font-bold text-primary mt-6">II. TÉRMINOS Y CONDICIONES GENERALES DE USO</h3>
                    <p><strong>El objeto de las condiciones: El Sitio Web</strong></p>
                    <p>
                        El objeto de las presentes Condiciones Generales de Uso (en adelante, Condiciones) es regular el acceso y la utilización del Sitio Web. A los efectos de las presentes Condiciones se entenderá como Sitio Web: la apariencia externa de los interfaces de pantalla, tanto de forma estática como de forma dinámica, es decir, el árbol de navegación; y todos los elementos integrados tanto en los interfaces de pantalla como en el árbol de navegación (en adelante, Contenidos) y todos aquellos servicios o recursos en línea que en su caso ofrezca a los Usuarios (en adelante, Servicios).
                    </p>
                    <p>
                        Pinturaexpress.org servicio de pintura para bicicletas y reparación de carbono se reserva la facultad de modificar, en cualquier momento, y sin aviso previo, la presentación y configuración del Sitio Web y de los Contenidos y Servicios que en él pudieran estar incorporados. El Usuario reconoce y acepta que en cualquier momento Pinturaexpress.org servicio de pintura para bicicletas y reparación de carbono pueda interrumpir, desactivar y/o cancelar cualquiera de estos elementos que se integran en el Sitio Web o el acceso a los mismos.
                    </p>
                    <p>
                        El acceso al Sitio Web por el Usuario tiene carácter libre y, por regla general, es gratuito sin que el Usuario tenga que proporcionar una contraprestación para poder disfrutar de ello, salvo en lo relativo al coste de conexión a través de la red de telecomunicaciones suministrada por el proveedor de acceso que hubiere contratado el Usuario.
                    </p>
                    <p>
                        La utilización de alguno de los Contenidos o Servicios del Sitio Web podrá hacerse mediante la suscripción o registro previo del Usuario.
                    </p>

                    <p><strong>El Usuario</strong></p>
                    <p>
                        El acceso, la navegación y uso del Sitio Web, así como por los espacios habilitados para interactuar entre los Usuarios, y el Usuario y Pinturaexpress.org servicio de pintura para bicicletas y reparación de carbono, como los comentarios y/o espacios de blogging, confiere la condición de Usuario, por lo que se aceptan, desde que se inicia la navegación por el Sitio Web, todas las Condiciones aquí establecidas, así como sus ulteriores modificaciones, sin perjuicio de la aplicación de la correspondiente normativa legal de obligado cumplimiento según el caso. Dada la relevancia de lo anterior, se recomienda al Usuario leerlas cada vez que visite el Sitio Web.
                    </p>
                    <p>
                        El Sitio Web de Pinturaexpress.org servicio de pintura para bicicletas y reparación de carbono proporciona gran diversidad de información, servicios y datos. El Usuario asume su responsabilidad para realizar un uso correcto del Sitio Web. Esta responsabilidad se extenderá a:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Un uso de la información, Contenidos y/o Servicios y datos ofrecidos por Pinturaexpress.org servicio de pintura para bicicletas y reparación de carbono sin que sea contrario a lo dispuesto por las presentes Condiciones, la Ley, la moral o el orden público, o que de cualquier otro modo puedan suponer lesión de los derechos de terceros o del mismo funcionamiento del Sitio Web.</li>
                        <li>La veracidad y licitud de las informaciones aportadas por el Usuario en los formularios extendidos por Pinturaexpress.org servicio de pintura para bicicletas y reparación de carbono para el acceso a ciertos Contenidos o Servicios ofrecidos por el Sitio Web. En todo caso, el Usuario notificará de forma inmediata a Pinturaexpress.org servicio de pintura para bicicletas y reparación de carbono acerca de cualquier hecho que permita el uso indebido de la información registrada en dichos formularios, tales como, pero no solo, el robo, extravío, o el acceso no autorizado a identificadores y/o contraseñas, con el fin de proceder a su inmediata cancelación.</li>
                    </ul>
                    <p>
                        Pinturaexpress.org servicio de pintura para bicicletas y reparación de carbono se reserva el derecho de retirar todos aquellos comentarios y aportaciones que vulneren la ley, el respeto a la dignidad de la persona, que sean discriminatorios, xenófobos, racistas, pornográficos, spamming, que atenten contra la juventud o la infancia, el orden o la seguridad pública o que, a su juicio, no resultaran adecuados para su publicación.
                    </p>
                    <p>
                        En cualquier caso, Pinturaexpress.org servicio de pintura para bicicletas y reparación de carbono no será responsable de las opiniones vertidas por los Usuarios a través de comentarios u otras herramientas de blogging o de participación que pueda haber.
                    </p>
                    <p>
                        El mero acceso a este Sitio Web no supone entablar ningún tipo de relación de carácter comercial entre Pinturaexpress.org servicio de pintura para bicicletas y reparación de carbono y el Usuario.
                    </p>
                    <p>
                        El Usuario declara ser mayor de edad y disponer de la capacidad jurídica suficiente para vincularse por las presentes Condiciones. Por lo tanto, este Sitio Web de Pinturaexpress.org servicio de pintura para bicicletas y reparación de carbono no se dirige a menores de edad. Pinturaexpress.org servicio de pintura para bicicletas y reparación de carbono declina cualquier responsabilidad por el incumplimiento de este requisito.
                    </p>
                    <p>
                        El Sitio Web está dirigido principalmente a Usuarios residentes en España. Pinturaexpress.org servicio de pintura para bicicletas y reparación de carbono no asegura que el Sitio Web cumpla con legislaciones de otros países, ya sea total o parcialmente. Si el Usuario reside o tiene su domiciliado en otro lugar y decide acceder y/o navegar en el Sitio Web lo hará bajo su propia responsabilidad, deberá asegurarse de que tal acceso y navegación cumple con la legislación local que le es aplicable, no asumiendo Pinturaexpress.org servicio de pintura para bicicletas y reparación de carbono responsabilidad alguna que se pueda derivar de dicho acceso.
                    </p>

                    <h3 className="text-lg font-bold text-primary mt-6">III. ACCESO Y NAVEGACIÓN EN EL SITIO WEB: EXCLUSIÓN DE GARANTÍAS Y RESPONSABILIDAD</h3>
                    <p>
                        Pinturaexpress.org servicio de pintura para bicicletas y reparación de carbono no garantiza la continuidad, disponibilidad y utilidad del Sitio Web, ni de los Contenidos o Servicios. Pinturaexpress.org servicio de pintura para bicicletas y reparación de carbono hará todo lo posible por el buen funcionamiento del Sitio Web, sin embargo, no se responsabiliza ni garantiza que el acceso a este Sitio Web no vaya a ser ininterrumpido o que esté libre de error.
                    </p>
                    <p>
                        Tampoco se responsabiliza o garantiza que el contenido o software al que pueda accederse a través de este Sitio Web, esté libre de error o cause un daño al sistema informático (software y hardware) del Usuario. En ningún caso Pinturaexpress.org servicio de pintura para bicicletas y reparación de carbono será responsable por las pérdidas, daños o perjuicios de cualquier tipo que surjan por el acceso, navegación y el uso del Sitio Web, incluyéndose, pero no limitándose, a los ocasionados a los sistemas informáticos o los provocados por la introducción de virus.
                    </p>
                    <p>
                        Pinturaexpress.org servicio de pintura para bicicletas y reparación de carbono tampoco se hace responsable de los daños que pudiesen ocasionarse a los usuarios por un uso inadecuado de este Sitio Web. En particular, no se hace responsable en modo alguno de las caídas, interrupciones, falta o defecto de las telecomunicaciones que pudieran ocurrir.
                    </p>

                    <h3 className="text-lg font-bold text-primary mt-6">IV. POLÍTICA DE ENLACES</h3>
                    <p>
                        Se informa que el Sitio Web de Pinturaexpress.org servicio de pintura para bicicletas y reparación de carbono pone o puede poner a disposición de los Usuarios medios de enlace (como, entre otros, links, banners, botones), directorios y motores de búsqueda que permiten a los Usuarios acceder a sitios web pertenecientes y/o gestionados por terceros.
                    </p>
                    <p>
                        La instalación de estos enlaces, directorios y motores de búsqueda en el Sitio Web tiene por objeto facilitar a los Usuarios la búsqueda de y acceso a la información disponible en Internet, sin que pueda considerarse una sugerencia, recomendación o invitación para la visita de los mismos.
                    </p>
                    <p>
                        Pinturaexpress.org servicio de pintura para bicicletas y reparación de carbono no ofrece ni comercializa por sí ni por medio de terceros los productos y/o servicios disponibles en dichos sitios enlazados.
                    </p>
                    <p>
                        Asimismo, tampoco garantizará la disponibilidad técnica, exactitud, veracidad, validez o legalidad de sitios ajenos a su propiedad a los que se pueda acceder por medio de los enlaces.
                    </p>
                    <p>
                        Pinturaexpress.org servicio de pintura para bicicletas y reparación de carbono en ningún caso revisará o controlará el contenido de otros sitios web, así como tampoco aprueba, examina ni hace propios los productos y servicios, contenidos, archivos y cualquier otro material existente en los referidos sitios enlazados.
                    </p>
                    <p>
                        Pinturaexpress.org servicio de pintura para bicicletas y reparación de carbono no asume ninguna responsabilidad por los daños y perjuicios que pudieran producirse por el acceso, uso, calidad o licitud de los contenidos, comunicaciones, opiniones, productos y servicios de los sitios web no gestionados por Pinturaexpress.org servicio de pintura para bicicletas y reparación de carbono y que sean enlazados en este Sitio Web.
                    </p>
                    <p>
                        El Usuario o tercero que realice un hipervínculo desde una página web de otro, distinto, sitio web al Sitio Web de Pinturaexpress.org servicio de pintura para bicicletas y reparación de carbono deberá saber que:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>No se permite la reproducción —total o parcialmente— de ninguno de los Contenidos y/o Servicios del Sitio Web sin autorización expresa de Pinturaexpress.org servicio de pintura para bicicletas y reparación de carbono.</li>
                        <li>No se permite tampoco ninguna manifestación falsa, inexacta o incorrecta sobre el Sitio Web de Pinturaexpress.org servicio de pintura para bicicletas y reparación de carbono, ni sobre los Contenidos y/o Servicios del mismo.</li>
                        <li>A excepción del hipervínculo, el sitio web en el que se establezca dicho hiperenlace no contendrá ningún elemento, de este Sitio Web, protegido como propiedad intelectual por el ordenamiento jurídico español, salvo autorización expresa de Pinturaexpress.org servicio de pintura para bicicletas y reparación de carbono.</li>
                        <li>El establecimiento del hipervínculo no implicará la existencia de relaciones entre Pinturaexpress.org servicio de pintura para bicicletas y reparación de carbono y el titular del sitio web desde el cual se realice, ni el conocimiento y aceptación de Pinturaexpress.org servicio de pintura para bicicletas y reparación de carbono de los contenidos, servicios y/o actividades ofrecidas en dicho sitio web, y viceversa.</li>
                    </ul>

                    <h3 className="text-lg font-bold text-primary mt-6">V. PROPIEDAD INTELECTUAL E INDUSTRIAL</h3>
                    <p>
                        Pinturaexpress.org servicio de pintura para bicicletas y reparación de carbono por sí o como parte cesionaria, es titular de todos los derechos de propiedad intelectual e industrial del Sitio Web, así como de los elementos contenidos en el mismo (a título enunciativo y no exhaustivo, imágenes, sonido, audio, vídeo, software o textos, marcas o logotipos, combinaciones de colores, estructura y diseño, selección de materiales usados, programas de ordenador necesarios para su funcionamiento, acceso y uso, etc.). Serán, por consiguiente, obras protegidas como propiedad intelectual por el ordenamiento jurídico español, siéndoles aplicables tanto la normativa española y comunitaria en este campo, como los tratados internacionales relativos a la materia y suscritos por España.
                    </p>
                    <p>
                        Todos los derechos reservados. En virtud de lo dispuesto en la Ley de Propiedad Intelectual, quedan expresamente prohibidas la reproducción, la distribución y la comunicación pública, incluida su modalidad de puesta a disposición, de la totalidad o parte de los contenidos de esta página web, con fines comerciales, en cualquier soporte y por cualquier medio técnico, sin la autorización de Pinturaexpress.org servicio de pintura para bicicletas y reparación de carbono.
                    </p>
                    <p>
                        El Usuario se compromete a respetar los derechos de propiedad intelectual e industrial de Pinturaexpress.org servicio de pintura para bicicletas y reparación de carbono. Podrá visualizar los elementos del Sitio Web o incluso imprimirlos, copiarlos y almacenarlos en el disco duro de su ordenador o en cualquier otro soporte físico siempre y cuando sea, exclusivamente, para su uso personal. El Usuario, sin embargo, no podrá suprimir, alterar, o manipular cualquier dispositivo de protección o sistema de seguridad que estuviera instalado en el Sitio Web.
                    </p>
                    <p>
                        En caso de que el Usuario o tercero considere que cualquiera de los Contenidos del Sitio Web suponga una violación de los derechos de protección de la propiedad intelectual, deberá comunicarlo inmediatamente a Pinturaexpress.org servicio de pintura para bicicletas y reparación de carbono a través de los datos de contacto del apartado de INFORMACIÓN GENERAL de este Aviso Legal y Condiciones Generales de Uso.
                    </p>

                    <h3 className="text-lg font-bold text-primary mt-6">VI. ACCIONES LEGALES, LEGISLACIÓN APLICABLE Y JURISDICCIÓN</h3>
                    <p>
                        Pinturaexpress.org servicio de pintura para bicicletas y reparación de carbono se reserva la facultad de presentar las acciones civiles o penales que considere necesarias por la utilización indebida del Sitio Web y Contenidos, o por el incumplimiento de las normas aquí descritas.
                    </p>
                </div>
            </div>

            {/* Backdrop click to close */}
            <div className="absolute inset-0 -z-10" onClick={onClose} />
        </div>
    );
}
