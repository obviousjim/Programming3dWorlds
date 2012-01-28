/**
 * Geometry Helpers
 * by James George 
 * January 2011
 *
 * For
 * Pixels to Polygons: Coding 3d Worlds ITP
 * 
 * A simple plug-in to generating 3d geometry easy
 * MIT LICENSE
 * 
 */
 
public class GeometryHelper {
	private static var materials : Array = [];
	private static var geometryParent : GameObject;
	private static var mesh : Mesh;
	private static var vertices : Array;
	private static var indices : Array;	
	private static var uvs : Array;
	private static var colors : Array;
	
	//SPHERES
	static function CreateSphere(pos : Vector3, radius : float) : GameObject {
		return CreatePrimitive(pos, radius, PrimitiveType.Sphere);
	}
	
	static function CreateSphere(pos : Vector3, scale : Vector3) : GameObject {
		return CreatePrimitive(pos,scale, PrimitiveType.Sphere);
	}
 	//
 	
	//CUBES
	static function CreateCube(pos : Vector3, radius : float) : GameObject {
		return CreatePrimitive(pos,radius, PrimitiveType.Cube);
	}

	static function CreateCube(pos : Vector3, scale : Vector3) : GameObject {
		return CreatePrimitive(pos,scale,PrimitiveType.Cube);
	}
	//
	
	//CYLINDERS
	static function CreateCylinder(pos : Vector3, scale : float) : GameObject {
		return CreatePrimitive(pos,scale, PrimitiveType.Cylinder);				
	}

	static function CreateCylinder(pos : Vector3, scale : Vector3) : GameObject {
		return CreatePrimitive(pos,scale, PrimitiveType.Cylinder);						
	}
	//

	//CAPSULES
	static function CreateCapsule(pos : Vector3, scale : float) : GameObject {
		return CreatePrimitive(pos,scale, PrimitiveType.Capsule);		
	}

	static function CreateCapsule(pos : Vector3, scale : Vector3) : GameObject {
		return CreatePrimitive(pos,scale,PrimitiveType.Capsule);
	}
	//
			
	//GENERIC PRIMITIVE
	private static function CreatePrimitive(pos : Vector3, scale : float, type : PrimitiveType) : GameObject {
		return CreatePrimitive(pos, Vector3(scale,scale,scale), type);
	}
	
	private static function CreatePrimitive(pos : Vector3, scale : Vector3, type : PrimitiveType) : GameObject {
		var prim = GameObject.CreatePrimitive(type);
	   	prim.transform.position = pos;
	   	prim.transform.localScale = scale;
		prim.transform.parent = GetGeometryParent();
	   	return prim;
	}
	//
	
	//PLANES
	static function CreateVerticalPlaneAlongX(center : Vector3, width : float, height : float) : GameObject {
		var plane = GameObject.CreatePrimitive(PrimitiveType.Plane);
		plane.transform.position = center;
		plane.transform.localScale = Vector3(height, 1, width);
		plane.transform.Rotate(-Vector3.forward, 90);
		plane.transform.parent = GetGeometryParent();
		return plane;
	}

	static function CreateVerticalPlaneAlongZ(center : Vector3, width : float, height : float) : GameObject {
		var plane = GameObject.CreatePrimitive(PrimitiveType.Plane);
		plane.transform.position = center;
		plane.transform.localScale = Vector3(width, 1, height);
		plane.transform.Rotate(Vector3.left, 90);
		plane.transform.parent = GetGeometryParent();
		return plane;
	}
	
	static function CreateHorizontalPlane(center : Vector3, width : float, depth : float) : GameObject {
		var plane = GameObject.CreatePrimitive(PrimitiveType.Plane);
		plane.transform.position = center;		
		plane.transform.localScale = Vector3(width, 1, depth);
		plane.transform.parent = GetGeometryParent();
		return plane;		
	}
	//
	
	//POLYGONS
	static function CreatePoly(a : Vector3, b : Vector3, c : Vector3) : GameObject {
		BeginPolys();
		AddPoly(a,b,c);
		EndPolys();

	}

	static function BeginPolys(){
		if(mesh != null){
			Debug.LogWarning("Forcing end polys. check that begin/end is matched");
			EndPolys();
		}
		
		mesh = new Mesh();
		vertices = [];
		indices = [];
		uvs = [];
		colors = [];
	}
	
	static function AddPoly(a : Vector3, b : Vector3, c : Vector3){
		if(mesh == null){
			Debug.LogWarning("Forcing begin polys. Check that begin/end is matched");
			BeginPolys();
		}

		vertices.Push(a);
		vertices.Push(b);
		vertices.Push(c);
		indices.Push(vertices.length-3);
		indices.Push(vertices.length-2);
		indices.Push(vertices.length-1);
		uvs.Push(Vector2(0,0));
		uvs.Push(Vector2(1,0));
		uvs.Push(Vector2(0,1));
		
//		colors.Push(Color(Random.value,Random.value,Random.value));
//		colors.Push(Color(Random.value,Random.value,Random.value));
//		colors.Push(Color(Random.value,Random.value,Random.value));
	}
	
	static function EndPolys() : GameObject {
		mesh.vertices = vertices;
	    mesh.triangles = indices;
		mesh.uv = uvs;
		mesh.colors = colors;
		mesh.RecalculateNormals();
		mesh.RecalculateBounds();
		
		var meshContainer : GameObject = GameObject("TriMesh");
	    meshContainer.AddComponent(MeshFilter);
	    meshContainer.GetComponent(MeshFilter).mesh = mesh;	    
	    meshContainer.AddComponent(MeshRenderer);
	    
	    meshContainer.renderer.sharedMaterial = GetMaterialWithColor(Color.gray);	    
	    meshContainer.transform.parent = GetGeometryParent();

		mesh = null;
		return meshContainer;		
	}
	
	//LIGHTS
	static function CreatePointLight(position : Vector3, range : float, intensity : float, color : Color) : GameObject {
		var lightContainer = CreateLight(position, intensity, color, LightType.Point);
		var lightComponent = lightContainer.GetComponent(Light);
		lightComponent.range = range;
		return lightContainer;
	}
	
	static function CreateDirectionalLight(position : Vector3, direction : Vector3, intensity : float, color : Color) : GameObject {
		var lightContainer = CreateLight(position, intensity, color, LightType.Directional);
		lightContainer.transform.LookAt(position + direction);
		return lightContainer;
	}
	
	static function CreateSpotLight(position : Vector3, direction : Vector3, range : float, angle : float, intensity : float, color : Color) : GameObject {
		var lightContainer = CreateLight(position, intensity, color, LightType.Spot);
		lightContainer.transform.LookAt(position + direction);
		var lightComponent = lightContainer.GetComponent(Light); 
		lightComponent.spotAngle = angle;
		lightComponent.range = range;
		return lightContainer;	
	}
	
	private static function CreateLight(position : Vector3, intensity : float, color : Color, type : LightType) : GameObject {
		var lightContainer : GameObject = new GameObject("Light");
		lightContainer.AddComponent(Light);
		var lightComponent = lightContainer.GetComponent(Light);
		lightComponent.type = type;
		lightComponent.intensity = intensity;
		lightComponent.color = color;
		lightContainer.transform.parent = GetGeometryParent();
		lightContainer.transform.position = position;
		return lightContainer;
	}
	
	//TODO: applying colors
	static function ApplyColor(object : GameObject, c : Color){
		object.renderer.sharedMaterial = GetMaterialWithColor(c);
	}
	
	//TODO: applying rotations
	static function Flip(object : GameObject, axis : Vector3){
		object.transform.Rotate(axis, 180);
	}
	
	private static function GetMaterialWithColor( c : Color) : Material{
		for(var i = 0; i < materials.length; i++){
			if(materials[i].color == c){
				mat = materials[i];
				break;
			}
		}
		 
		if(mat == null){
			mat = new Material(Shader.Find("Diffuse"));
			mat.SetColor("_Color", c);
			materials.Push(mat);
		}		
		return mat;
		
	}
	
	private static function GetGeometryParent() : Transform{
		if(geometryParent == null){
			geometryParent = GameObject("GeneratedGeometry");
		}
		return geometryParent.transform;
	}

}
