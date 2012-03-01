/*
 * Basic Vertex Displacement Shader
 * Shows how to use a texture to modify geometry in real the shader.  
 * This example extrues vertices along Y based on the red channel, making for a cheap and easy height map
 *
 * Requires forced GLSL in order to acheive the texture fetch in the vertex shader
 */
Shader "Custom/VertexDisplacement" 
{
	Properties 
	{
		_DisplacementMap ("Displacement Map", 2D) = "white" {}
		_DisplacementScale ("Displacement Scale", Float) = 0 
	}

	SubShader {
		
	    Pass {


//
CGPROGRAM
#pragma glsl //forces GLSL which let's us do texture look ups in the vertex shader
#pragma target 3.0
#pragma exclude_renderers xbox360
#pragma vertex vert
#pragma fragment frag
#include "UnityCG.cginc"

sampler2D _DisplacementMap;
float _DisplacementScale;

struct v2f 
{
	float4 pos : SV_POSITION;
    float2 uv : TEXCOORD0;  
};

float4 _DisplacementMap_ST;
v2f vert (appdata_tan v)
{
    v2f o;
    
    o.uv = TRANSFORM_TEX(v.texcoord, _DisplacementMap);
    float displacement = tex2D(_DisplacementMap, o.uv).g; //just read the r channel
	v.vertex.y += (displacement * _DisplacementScale); //extrude along the normals
       
    o.pos = mul (UNITY_MATRIX_MVP, v.vertex);   
    return o; //this becomes i in the fragment shader
};

half4 frag (v2f i) : COLOR
{
	return tex2D(_DisplacementMap, i.uv); 
}

ENDCG

	    }
	}
}