import { Component, OnInit } from "@angular/core";
import { DataService } from "../data.service";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  url = "";
  response = {
    text: "",
    error: false
  };

  copyMessage = "Click to copy!";

  constructor(private dataService: DataService) {}

  ngOnInit() {}

  shortenUrl() {
    if (this.url != "") {
      this.dataService.shortenUrl(this.url).subscribe(
        res => {
          this.response.text = res;
          this.response.error = false;
        },
        (err: HttpErrorResponse) => {
          this.response.text = err.error;
          this.response.error = true;

          setTimeout(() => {
            this.response.text = "";
          }, 3000);
        }
      );
    } else {
      alert("Please provide valid URL");
    }

    this.url = "";
  }

  copyUrl(url: string) {
    this.copyMessage = "Copied!";
    const selBox = document.createElement("textarea");
    selBox.style.position = "fixed";
    selBox.style.left = "0";
    selBox.style.top = "0";
    selBox.style.opacity = "0";
    selBox.value = url;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand("copy");
    document.body.removeChild(selBox);

    setTimeout(() => {
      this.response.text = "";
      this.copyMessage = "Cick to copy!";
    }, 3000);
  }
}
