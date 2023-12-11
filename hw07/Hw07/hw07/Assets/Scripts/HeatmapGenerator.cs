using UnityEngine;
using System.Collections.Generic;
using System.Linq;

public class HeatmapGenerator : MonoBehaviour
{
    public TextAsset jsonData;
    public DataWrapper dataWrapper;
    public Sprite point;


    private void Start()
    {
        dataWrapper = JsonUtility.FromJson<DataWrapper>(jsonData.ToString());

        // 生成熱力圖
        foreach (DataStruct data in dataWrapper.dataList)
        {
            float height = 0.0f;
            if (data.Floor == "1F")
                height = 1.0f;
            else if (data.Floor == "2F")
                height = 31.0f;
            else if (data.Floor == "3F")
                height = 61.0f;
            else if (data.Floor == "4F")
                height = 91.0f;
            Vector3 position = new Vector3(data.X, height, data.Y);
            //float radius = data.Pressure * 0.1f; // 設置半徑，你可以根據需要調整比例
            CreateHeatmapPoint(position, 1.0f, data.Weight);
        }
    }

    private void CreateHeatmapPoint(Vector3 position, float radius, float weight)
    {
        GameObject heatmapPoint = new GameObject("HeatmapPoint");
        heatmapPoint.transform.position = position;
        heatmapPoint.transform.rotation = Quaternion.Euler(90.0f, 0.0f, 0.0f);
        heatmapPoint.transform.parent = gameObject.transform;

        // 在這裡你可以根據需要自定義熱力圖的顯示效果，例如使用SpriteRenderer來顯示圖片，或者使用粒子系統等效果
        SpriteRenderer spriteRenderer = heatmapPoint.AddComponent<SpriteRenderer>();
        spriteRenderer.sprite = point;
        //float red = 1 * weight;
        //float green = 1 * (1 - weight);
        //float newWeight = CalWeight(weight);
        spriteRenderer.color = new Color(1, 0, 0, 0.2f); // 這裡使用紅色表示熱力圖

        // 設置圓形的縮放
        heatmapPoint.transform.localScale = new Vector3(radius, radius, 1);
    }

    private float CalWeight(float weight)
    {
        float mappedWeight = Mathf.Lerp(0.25f, 1f, Mathf.InverseLerp(5.397295409610899e-10f, 6.840214076129372e-06f, weight));
        return mappedWeight;
    }



}
