// Fetch data from the API
export const getData = async () => {
  try {
    const response = await fetch("http://localhost:4000");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Delete a note by ID
export const deleteNote = async (id) => {
  try {
    const response = await fetch(`http://localhost:4000/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await getData();
  } catch (error) {
    console.error("Error deleting note:", error);
  }
};

// Add a new note
export const addNote = async (note) => {
  try {
    const response = await fetch("http://localhost:4000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await getData();
  } catch (error) {
    console.error("Error adding note:", error);
  }
};

// Update an existing note by ID
export const updateNote = async (id, note) => {
  try {
    const response = await fetch(`http://localhost:4000/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await getData();
  } catch (error) {
    console.error("Error updating note:", error);
  }
};
