export const colors = {
    color_main : "#435ebe",
    color_blue : "#7BD3EA",
    color_red : "#F6D6D6",
    color_green : "#A1EEBD",
    color_yellow : "#F6F7C4",
}

export const colorArr = ["#435ebe", "#7BD3EA", "#F6D6D6", "#A1EEBD", "#F6F7C4"];

export const barOptions = {
    // 막대 색상 배열
    colors: colorArr,
    chart: {
      stacked: false, // 데이터 중첩 X
      /* 
      
      stacked: true, // 데이터 중첩 O (막대 하나에 모두 표시)
      stackType: "100%",  // 전체 범위 중 비율로 표기
      */

      toolbar: {
        show: true  // 마우스 올렸을 때 툴바 출력 여부
      },
      zoom: {
        enabled: true,
      },
    },
  
    // plotOptions : 차트 옵션 (line, bar, area, bubble, ... )
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 0,
        columnWidth: "80%",	// 막대 두께
        barHeight: "60%",   // 막대 높이
        dataLabels: {
          position: 'top'
        },
        spacing: 5, // 막대 간격 (단위 : px)
      },
    },

    // 막대 내부에 라벨(y축 값) 출력
    dataLabels: {
      enabled: false, // 데이터 포인트에 레이블 출력 여부 결정
      // 가로 위치 조정
      textAnchor: "middle",  // "start", "middle", "end"
      style: {
        color: colors.color_main,
        fontSize: 10,
        fontWeight: "bold",
      },
      // 세로 위치 조정
      offsetY: 5,
      formatter: (val) => {
        /* 단위 : 만원 & 구분 : 1000 단위 "," */
        return parseInt(val / 10000).toLocaleString() + " 만원";
        /* stacked: true 인 경우 전체 비율 중 해당 데이터의 비율을 출력 */
        // return val.toFixed(0) + "%";
      },
    },

    // 막대의 테두리 획 s설정
    stroke: {
      show: true, 
      width: 0.35,
      colors: [colors.color_main]
    },

    xaxis: {
      categories: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"], // x축 : 1~12월
      fontSize: 20,
      fontWeight: "bold",
      labels: {
        offsetY: 3, // x축 데이터 값
      }
    },

    // 범례 (서비스 항목)
    legend: {
      show: true,
      fontSize: '10px',
      // 차트에 종속할지 화면에 떠다닐지 설정
      floating: false, 
      /* 
      floating: false,
      position: "bottom", // floating: false일 경우 유효
      horizontalAlign: "left" , // floating: false일 경우 유효
      offsetX: 10,
      offsetY: -50,
      */
     /* 범례 표식 */
      markers: {
        show: true,
        size: 5,
        fillColors: colorArr,
      },
    },
    
    yaxis: {
      // y축 데이터 설명용 (단위로 활용)
      title: { 
        text: "(단위 : 만원)",
        // 글꼴 스타일 설정
        style: {
          fontSize: 10,
          fontWeight: "bold", 
        },
        rotate: 0, // 수평. 설정 없으면 차트가 틀어진다.
        offsetX: 15,
        // offsetY: -180,
      },
      // y축 데이터 값 
      labels: {
        formatter: val => parseInt(val / 10000).toLocaleString(),
      },
      type: "numeric"
    },

    fill: {
      opacity: 1, // 불투명
    },

    // 마우스 올렸을 때 뜨는 창
    tooltip: {
      y: {
        formatter: val => parseInt(val / 10000).toLocaleString() + " 만원"
      },
    },

    /* 참고 : https://apexcharts.com/docs/options/chart/toolbar/ */
    export: { // 미적용.
      csv: {
        filename: "acorn.csv",
      },
      svg: {
        filename: "acorn.svg",
      },
      png: {
        filename: "acorn.png",
      }
    }
  };