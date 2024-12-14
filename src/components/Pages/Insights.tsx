import { Flex, Text } from "@radix-ui/themes"
import { CSSProperties, useEffect, useState } from "react";
import { Insights as InsightsType } from "../../api";
import { fetchInsights } from "../../api/methods";
import { BarChart, PieChart } from "@mui/x-charts";
import { insightsToBarChart, insightsToPieChartSeries } from "../../utils";

const Insights = () => {
  const [insights, setInsights] = useState<InsightsType>();
  let xAxisData;
  let series;

  if (insights) {
    const transformed = insightsToBarChart(insights);
    xAxisData = transformed?.xAxisData;
    series = transformed?.series;
  }

  useEffect(() => {
    (async () => {
      try {
        const insightsResponse = await fetchInsights();
        setInsights(insightsResponse);
      } catch (error) {
        setInsights(undefined);
      }
    })();
  }, []);    
    return (
        <Flex
        direction="column"
        justify="center"
        gap="3"
        ml="9"
        mr="9"
        mb="9"
        mt="6"
        p="7"
        style={styles.container}
      >
        <Text align="center" style={styles.text}>Model(s) usage</Text>
        <PieChart
          series={[
            {
                arcLabel: (item) => `${item.value}`,
                arcLabelMinAngle: 35,
                arcLabelRadius: '60%',                
                data: insightsToPieChartSeries(insights)
            }
          ]}
          height={250}
        />
        {xAxisData && series && (
          <>
            <Text align="center" style={styles.text}>Average count distribution per model</Text>            
            <BarChart
              xAxis={[{ scaleType: 'band', data: xAxisData }]}
              series={series}
              height={350}
              barLabel="value"
           />    
          </>
        )}
      </Flex>
    )
}

const styles: {
  container: CSSProperties;
  text: CSSProperties;
} = {
  container: {
    border: "2px solid gray",
    borderRadius: "16px",
    boxShadow: "0 0 10px 0 #cccccc",
    backgroundColor: "#faf5ed",
  },
  text: {
    fontFamily: "Montserrat",
    fontSize: 24,
    fontWeight: 'bold',
  },
};

export default Insights;
