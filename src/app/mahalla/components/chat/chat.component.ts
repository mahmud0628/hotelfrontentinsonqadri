import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  messages: any[] = [
    {
      input: false,
      text: "Assalomu alaykum. Kredit masalasi bo'yicha yozayotgandim.",
      time: "04.04.2022 15:40"
    },
    {
      input: true,
      text: "Assalomu alaykum.Bemalol so'rayvering",
      time: "04.04.2022 15:47"
    },
    {
      input: false,
      text: "Kredit olish tartibi qanday? Sigir boqmoqchi edim?",
      time: "04.04.2022 15:50"
    },
    {
      input: true,
      text: "Mahallaga kelib ketsangiz to'liq tushuntiramiz",
      time: "04.04.2022 16:47"
    },

  ]
  constructor() { }

  ngOnInit(): void {
  }

  send(inp: any){

    this.messages.push({
      input: false,
      text: inp.value,
      time: new Date()
    })
    inp.value = "";

  }
}
