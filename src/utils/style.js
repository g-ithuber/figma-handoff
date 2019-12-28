import Color from "color"

export const getRGBA = color =>
  ({r: (color.r*255).toFixed(), g: (color.g*255).toFixed(), b: (color.b*255).toFixed(), alpha: color.a})

export const getCSSRGBA = color =>
  `rgba(${Object.keys(getRGBA(color)).map(key => getRGBA(color)[key]).join(',')})`

export const getColor = color =>
  Color(getRGBA(color))

// gradientHandlePositions
export const getSolidColor = fill =>
  `linear-gradient(to bottom, ${getCSSRGBA(fill.color)}, ${getCSSRGBA(fill.color)})`
  
export const getGradientLinear = fill =>
  `linear-gradient(to top, ${getCSSRGBA(fill.gradientStops[0].color)}, ${getCSSRGBA(fill.gradientStops[1].color)})`

export const getGradientRadial = fill =>
  `radial-gradient(circle at 0 0, ${getCSSRGBA(fill.gradientStops[0].color)}, ${getCSSRGBA(fill.gradientStops[1].color)})`

export const getGradientAngular = fill =>
  `conic-gradient(from 0.25turn, ${getCSSRGBA(fill.gradientStops[0].color)}, ${getCSSRGBA(fill.gradientStops[1].color)})`

export const getFillsStyle = fills =>
  fills.map(fill => {
    switch (fill.type) {
      case 'SOLID':
        return getSolidColor(fill)
      case 'GRADIENT_LINEAR':
        return getGradientLinear(fill)
      case 'GRADIENT_RADIAL':
        return getGradientRadial(fill)
      case 'GRADIENT_ANGULAR':
        return getGradientAngular(fill)
      case 'GRADIENT_DIAMOND':
        return getGradientLinear(fill)
      default:
        return ''
    }
  })

export const getEffectsStyle = effects => {
  let type = ''
  const styles = effects.map(effect => {
    type = type==='' ? effect.type : ( type===effect.type ? type : 'MIX_EFFECT')
    switch (effect.type) {
      case 'DROP_SHADOW':
        return { boxShadow: `${effect.offset.x}px ${effect.offset.y}px ${effect.radius}px 0 ${getCSSRGBA(effect.color)}` }
      case 'INNER_SHADOW':
        return { boxShadow: `inset ${effect.offset.x}px ${effect.offset.y}px ${effect.radius}px 0 ${getCSSRGBA(effect.color)}` }
      case 'LAYER_BLUR':
        return { filter: `blur(${effect.radius}px)` }
      case 'BACKGROUND_BLUR':
        return { backdropFilter: `blur(${effect.radius}px)` }
      default:
        return {}
    }
  })
  return { type, styles }
}