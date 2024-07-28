import dynamic from "next/dynamic";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function ChartLine({ titleTooltip, categories, data }) {
    const option = {
        chart: {
            type: 'line',
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            },
            fontFamily: "IRANSans"
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
            }
        },
        markers: {
            colors: "#15aa7f"
        },
        grid: {
            borderColor: "#eff0f2",
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
                color: "#eff0f2"
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
