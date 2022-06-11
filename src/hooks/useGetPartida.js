import { useState } from "react"

function useGetPartida() {

  const [partida, setPartida] = useState([
    "- Seleccione -",
    "Animales vivos y productos del reino animal	Enviar",
    "Productos del reino vegetal	Enviar",
    "Grasas y aceites animales o vegetales; productos de su desdoblamiento; grasas alimenticias elaboradas; ceras de origen animal o vegetal	Enviar",
    "Productos de las industrias alimentarias; bebidas, líquidos alcohólicos y vinagre; tabaco y sucedáneos del tabaco elaborados	Enviar",
    "Productos minerales	Enviar",
    "Productos de las industrias químicas o de las industrias conexas	Enviar",
    "Plástico y sus manufacturas; caucho y sus manufacturas	Enviar",
    "Pieles, cueros, peletería y manufacturas de estas materias; artículos de talabartería o guarnicionería; artículos de viaje, bolsos de mano (carteras) y continentes similares; manufacturas de tripa	Enviar",
    "Madera, carbón vegetal y manufacturas de madera; corcho y sus manufacturas; manufacturas de espartería o cestería	Enviar",
    "Pasta de madera o de las demás materias fibrosas celulósicas; papel o cartón para reciclar (desperdicios y desechos); papel o cartón y sus aplicaciones	Enviar",
    "Materias textiles y sus manufacturas	Enviar",
    "Calzado, sombreros y demás tocados, paraguas, quitasoles, bastones, látigos, fustas, y sus partes; plumas preparadas y artículos de plumas; flores artificiales; manufacturas de cabello	Enviar",
    "Manufacturas de piedra, yeso fraguable, cemento, amianto (asbesto), mica o materias análogas; productos cerámicos; vidrio y sus manufacturas	Enviar",
    "Perlas finas (naturales) o cultivadas, piedras preciosas o semipreciosas, metales preciosos, chapados de metal precioso (plaque) y manufacturas de estas materias; bisutería; monedas	Enviar",
    "Metales comunes y manufacturas de estos metales	Enviar",
    "Maquinas y aparatos, material eléctrico y sus partes; aparatos de grabación o reproducción de sonido, aparatos de grabación o reproducción de imagen y sonido en televisión, y las partes y accesorios de estos aparatos	Enviar",
    "Material de transporte	Enviar",
    "Instrumentos y aparatos de óptica, fotografía o cinematografía, de medida, control o precisión; instrumentos y aparatos medicoquirúrgicos; aparatos de relojería; instrumentos musicales; partes y accesorios de estos instrumentos o aparatos	Enviar",
    "Armas, municiones, y sus partes y accesorios	Enviar",
    "Mercancías y productos diversos	Enviar",
    "Objetos de arte o colección y antigüedades",
  ])

  return [partida, setPartida]
}

export {useGetPartida}
