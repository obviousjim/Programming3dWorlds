Shader "Custom/MyShader" {
	Properties {
		_MyColor ("Some Color", Color) = (.4, .2, .54) // color
		_MyBase ("Base Color", Color) = (1.0,1.0,1.0)
 		_MySlider ("SomeValue", Range (0.02,0.15)) = 0.07 // slider
     	_MyTexture ("Some Texture", 2D) = "white" { } //texture
    }

    SubShader {
    	// Apply Color
//    	Pass {
//    		Color [_MyColor]  		
//    	}
    	
    	//Apply material properties simply
//    	Pass {
//    		Material {
//    			Diffuse [_MyColor]
//    			Ambient [_MyColor]
//    		}
//    		Lighting On
//    	}
    	
    	Pass {
    		Material {
    			Diffuse [_MyColor]
    			Ambient [_MyColor]
    		}
    		Lighting On
    	}
    	
        // Apply base texture
//		Pass {
//     		SetTexture [_MyTexture] {
//      		combine texture
//      	}   		
//    	}
	}
}