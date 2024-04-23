let data: Record<string, unknown> = {};

export class FooBarBazIntegration {
  constructor(private cookies: string) {}

  public async authenticate(username: string, password: string) {
    const response = await fetch("https://foobarbaz.com/authenticate", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });

    const json = await response.json();
    this.cookies = json.cookies;
    return null;
  }

  async getData() {
    const companyInfo = await fetch("https://foobarbaz.com/company", {
      headers: {
        Cookie: this.cookies,
      },
    });

    const employeeInfo = await fetch("https://foobarbaz.com/employee", {
      headers: {
        Cookie: this.cookies,
      },
    });

    const payrollInfo = await fetch("https://foobarbaz.com/payroll", {
      headers: {
        Cookie: this.cookies,
      },
    });

    data = {
      company: await companyInfo.json(),
      employee: await employeeInfo.json(),
      payroll: await payrollInfo.json(),
    };
  }

  public async company() {
    await this.getData();

    return data.company;
  }

  async employeeData() {
    await this.getData();

    return data.employee;
  }

  async getPayrollInfo() {
    await this.getData();

    return data.payroll;
  }
}
