import { useDarkMode } from "@/context/DarkModeContext";
import { useDashboardSettings } from "@/hooks/useProfile";
import dynamic from "next/dynamic";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function ChartLine({ titleTooltip, categories, data }) {
    const { isDarkMode } = useDarkMode();
    const { settings, isLoading } = useDashboardSettings();

    const option = {
        chart: {
            type: 'line',
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            },
            fontFamily: !isLoading ? settings.font : "IRANSans"
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            colors: "#15aa7f",
            curve: "smooth",
            width: "3"
        },
        tooltip: {
            marker: {
                show: false,
            },
        },
        markers: {
            colors: "#15aa7f"
        },
        grid: {
            borderColor: !isLoading && settings.theme === "dark" ? "#374151" : "#eff0f2",
            xaxis: {
                lines: {
                    show: true
                }
            },
            yaxis: {
                lines: {
                    show: true
                }
            },

        },
        xaxis: {
            categories,
            axisBorder: {
                color: !isLoading && settings.theme === "dark" ? "#374151" : "#eff0f2"
            },
            labels: {
                style: {
                    colors: "#0693a4"
                }
            }
        },
        yaxis: {
            labels: {
                style: {
                    colors: "#0693a4"
                }
            }
        },
    }

    const series = [{
        name: titleTooltip,
        data
    }]

    return (
        <ApexChart type="line" options={option} series={series} />
    )
}
