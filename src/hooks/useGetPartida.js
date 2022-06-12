import { useState } from "react"

function useGetPartida() {

  const [partida, setPartida] = useState([
    "SECCIÓN I: Animales vivos y productos del reino animal	Enviar",
    "SECCIÓN II: Productos del reino vegetal	Enviar",
    "SECCIÓN III: Grasas y aceites animales o vegetales; productos de su desdoblamiento; grasas alimenticias elaboradas; ceras de origen animal o vegetal	Enviar",
    "SECCIÓN IV: Productos de las industrias alimentarias; bebidas, líquidos alcohólicos y vinagre; tabaco y sucedáneos del tabaco elaborados	Enviar",
    "SECCIÓN V: Productos minerales	Enviar",
    "SECCIÓN VI: Productos de las industrias químicas o de las industrias conexas	Enviar",
    "SECCIÓN VII: Plástico y sus manufacturas; caucho y sus manufacturas	Enviar",
    "SECCIÓN VIII: Pieles, cueros, peletería y manufacturas de estas materias; artículos de talabartería o guarnicionería; artículos de viaje, bolsos de mano (carteras) y continentes similares; manufacturas de tripa	Enviar",
    "SECCIÓN IX: Madera, carbón vegetal y manufacturas de madera; corcho y sus manufacturas; manufacturas de espartería o cestería	Enviar",
    "SECCIÓN X: Pasta de madera o de las demás materias fibrosas celulósicas; papel o cartón para reciclar (desperdicios y desechos); papel o cartón y sus aplicaciones	Enviar",
    "SECCIÓN XI: Materias textiles y sus manufacturas	Enviar",
    "SECCIÓN XII: Calzado, sombreros y demás tocados, paraguas, quitasoles, bastones, látigos, fustas, y sus partes; plumas preparadas y artículos de plumas; flores artificiales; manufacturas de cabello	Enviar",
    "SECCIÓN XIII: Manufacturas de piedra, yeso fraguable, cemento, amianto (asbesto), mica o materias análogas; productos cerámicos; vidrio y sus manufacturas	Enviar",
    "SECCIÓN XIV: Perlas finas (naturales) o cultivadas, piedras preciosas o semipreciosas, metales preciosos, chapados de metal precioso (plaque) y manufacturas de estas materias; bisutería; monedas	Enviar",
    "SECCIÓN XV: Metales comunes y manufacturas de estos metales	Enviar",
    "SECCIÓN XVI: Maquinas y aparatos, material eléctrico y sus partes; aparatos de grabación o reproducción de sonido, aparatos de grabación o reproducción de imagen y sonido en televisión, y las partes y accesorios de estos aparatos	Enviar",
    "SECCIÓN XVII: Material de transporte	Enviar",
    "SECCIÓN XVIII: Instrumentos y aparatos de óptica, fotografía o cinematografía, de medida, control o precisión; instrumentos y aparatos medicoquirúrgicos; aparatos de relojería; instrumentos musicales; partes y accesorios de estos instrumentos o aparatos	Enviar",
    "SECCIÓN XIX: Armas, municiones, y sus partes y accesorios	Enviar",
    "SECCIÓN XX: Mercancías y productos diversos	Enviar",
    "SECCIÓN XXI: Objetos de arte o colección y antigüedades",
  ])

  return [partida, setPartida]
}

export {useGetPartida}
