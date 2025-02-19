"use client";

export const calculateAge = async (birthdate: string): Promise<number> => {
  try {
    const ipResponse = await fetch("https://api.ipify.org?format=json");
    if (!ipResponse.ok) {
      throw new Error("Failed to fetch IP address");
    }

    const ipData = await ipResponse.json();
    const ipAddress = ipData.ip;
    const response = await fetch(`https://www.timeapi.io/api/time/current/ip?ipAddress=${ipAddress}`);
    if (!response.ok) {
      throw new Error("Failed to fetch current date and time");
    }

    const data = await response.json();
    const currentDate = new Date(data.date);
    console.info(`Date/Time: ${currentDate}`);

    const birthDate = new Date(birthdate);
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDifference = currentDate.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  } catch (error) {
    console.error("Error calculating age:", error);
    throw error;
  }
};
