import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AppService} from './app.service';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  // 最佳实践奖：
  // 1. 他/她的名字
  // 2. 你认为在团队协作方面他/她能拿几分（5分）原因（必填）
  // 3. 你认为在技术能力方面他/她能拿几分（5分）原因
  // 4. 你认为在技术创新方面他/她能拿几分（5分）原因
  // 5. 你认为在责任担当方面他/她能拿几分（5分）原因
  // 6. 你认为在成果交付质量方面他/她能拿几分（5分）原因
  // 7. 总体评价（请从具体工作事项和团队建设性意见、落地状况方面进行描述，并写出具体事例）
  TypeArr = {
    input: 'input',
    rate: 'rate',
    textarea: 'textarea'
  };
  // 投票选项
  voteArr = ['最佳实践奖'];
  // 投票问题
  voteQuestionArr = [
    {
      name: '他/她的名字',
      type: this.TypeArr.input,
      placeholder: '名字',
      isRequest: true,
    },
    {
      name: '总体评价',
      type: this.TypeArr.textarea,
      placeholder: '请从具体工作事项和团队建设性意见、落地状况方面进行描述，并写出具体事例',
      isRequest: true,
    },
    {
      name: '团队协作',
      type: this.TypeArr.rate,
      isRequest: true,
    },
    {
      name: '原因',
      type: this.TypeArr.textarea,
      placeholder: '',
      isRequest: false,
    },
    {
      name: '技术能力',
      type: this.TypeArr.rate,
      isRequest: true,
      content: '',
    },
    {
      name: '原因',
      type: this.TypeArr.textarea,
      placeholder: '',
      isRequest: false,
    },
    {
      name: '责任担当',
      type: this.TypeArr.rate,
      isRequest: true,
    },
    {
      name: '原因',
      type: this.TypeArr.textarea,
      placeholder: '',
      isRequest: false,
    },
    {
      name: '交付质量',
      type: this.TypeArr.rate,
      isRequest: true,
      content: '',
    },
    {
      name: '原因',
      type: this.TypeArr.textarea,
      placeholder: '',
      isRequest: false,
    }
  ];
  // 当前选择的index
  selectIndex = 0;
  validateForm: FormGroup;
  // controlArray: Array<{ index: number; show: boolean }> = [];
  controlArray = [];
  isCollapse = true;

  resetForm(): void {
    this.validateForm.reset();
  }

  constructor(private fb: FormBuilder, private appService: AppService, private message: NzMessageService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({});
    this.controlArray = this.voteQuestionArr;
    for (let i = 0; i < this.voteQuestionArr.length; i++) {
      if (this.voteQuestionArr[i].isRequest) {
        this.validateForm.addControl(`value${i}`, new FormControl(null, [Validators.required]));
      } else {
        this.validateForm.addControl(`value${i}`, new FormControl());
      }
    }
    // this.validateForm.controls[`value2`].setValue(1);
  }
  sendMes() {
    this.submitForm();
    if (this.validateForm.status === 'VALID') {
      this.appService.getHeroes(this.validateForm.getRawValue()).subscribe((mes) => {
        this.message.success('提交成功');
        this.resetForm();
      });
    } else {
      this.message.warning('表单有误');
    }
  }
  submitForm(): void {
    for (let i = 0; i < this.voteQuestionArr.length; i++) {
      this.validateForm.controls[`value${i}`].markAsDirty();
      this.validateForm.controls[`value${i}`].updateValueAndValidity();
    }
  }
  // 选择一个类型的投票
  selectVote(index: number) {
    this.selectIndex = index;
  }
}
