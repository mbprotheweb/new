function generateNoteAI(input_id) {
  // Get the note and prompt values
  var note = $("#" + input_id).val();
  var prompt = $("#mynoteai").val();

  // Check if note or prompt are empty
  if (note.trim() === "" || prompt.trim() === "") {
    notify(
      "Please enter some prompts and we will help you make your note sound more professional",
      "blackgloss"
    );
    return false;
  }

  $("#input_id").val(input_id);
  $("#loader").show();

  $.ajax({
    url: "https://admindragon.com/dashboard/generatesessionnoteai",
    type: "POST",
    data: {
      note: note,
      prompt: prompt
    },
    success: function (response) {
      $("#loader").hide();

      if (response.key == 1) {
        $("#generateNoteContent").val(response.content);

        if (!$("#modalGenerateNote").hasClass("show")) {
          $("#modalGenerateNote").modal("show");
        }
      } else {
        topAlert(response.message, "alert-danger");
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#loader").hide();
      topAlert("Error while adding response.", "alert-danger");
    }
  });
}
if (document.getElementById("mynoteai")) {
  alert("Already pressed");
  throw new Error("retry");
}
var eleaiid = document.createElement("input");
eleaiid.id = "mynoteai";
// eleaiid.value = prompt("What should I do with this note?");
document.body.appendChild(eleaiid);

var script = document.createElement("script");
script.type = "text/javascript";
script.textContent = generateNoteAI.toString();
document.head.appendChild(script);

// Create a button element
var button1 = document.createElement("button");
button1.innerHTML = "Reset Prompt";
document.getElementById("hcbs_dashb_session").prepend(button1);
button1.addEventListener("click", () => {
  eleaiid.value =
    "help me rewrite this data in a professional manner in the past tense for a summary of session notes completed by a provider for a client.";
});

// Create a button element
const button = document.createElement("button");
button.innerHTML = "Set New Prompt";
document.getElementById("hcbs_dashb_session").prepend(button);
button.addEventListener("click", () => {
  eleaiid.value = prompt(
    "What do you want me to do with the note?",
    eleaiid.value
  );
});
