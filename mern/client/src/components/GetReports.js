// api.js

// Función para obtener los datos del informe desde el servidor
export const fetchReportData = async () => {
    try {
    const response = await fetch('http://localhost:3001/api/report-data');
    
      const responseData = await response.json();
      if (responseData.status === "ok") {
        return responseData.data;
      } else {
        console.error("Error al obtener los datos del informe:", responseData.message);
        return null;
      }
      
    } catch (error) {
      console.error("Error al obtener los datos del informe:", error);
      return null;
    }
  };
  