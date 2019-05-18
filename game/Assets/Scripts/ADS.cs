using UnityEngine;
using UnityEngine.Advertisements;

public class ADS : MonoBehaviour
{
    
	public static void showAd()
	{

		if(Advertisement.IsReady ()) 
		Advertisement.Show();	
	}
}
