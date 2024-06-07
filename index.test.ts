import { FooBarBazIntegration } from "./FooBarBazIntegration";

describe("FooBarBazIntegration", () => {
  let fooBarBaz: FooBarBazIntegration;
  let fetchMock: jest.SpyInstance;

  beforeEach(() => {
    fooBarBaz = new FooBarBazIntegration("testCookies");
    fetchMock = jest.spyOn(global, "fetch");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("authenticate", () => {
    it("should authenticate user and update cookies", async () => {
      const mockResponse = { cookies: "newCookies" };
      fetchMock.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      });

      await fooBarBaz.authenticate("testUser", "testPassword");

      expect(fetch).toHaveBeenCalledWith("https://foobarbaz.com/authenticate", {
        method: "POST",
        body: JSON.stringify({
          username: "testUser",
          password: "testPassword",
        }),
      });
      expect(fooBarBaz.cookies).toBe("newCookies");
    });
  });

  describe("getCompanyInfo", () => {
    it("should fetch and return company info", async () => {
      const mockCompanyInfo = { name: "Test Company", employees: 100 };
      fetchMock.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockCompanyInfo),
      });

      await fooBarBaz.getData(); // This would be better if we could mock getData

      const companyInfo = await fooBarBaz.getCompanyInfo();

      expect(fetch).toHaveBeenCalledWith("https://foobarbaz.com/company", {
        headers: { Cookie: "testCookies" },
      });
      expect(companyInfo).toEqual(mockCompanyInfo);
    });
  });

  describe("getEmployeeInfo", () => {
    it("should fetch and return employee info", async () => {
      const mockEmployeeInfo = { name: "Test Employee", role: "Developer" };
      fetchMock.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockEmployeeInfo),
      });

      await fooBarBaz.getData(); // This would be better if we could mock getData

      const employeeInfo = await fooBarBaz.getEmployeeInfo();

      expect(fetch).toHaveBeenCalledWith("https://foobarbaz.com/employee", {
        headers: { Cookie: "testCookies" },
      });
      expect(employeeInfo).toEqual(mockEmployeeInfo);
    });
  });

  describe("getPayrollInfo", () => {
    it("should fetch and return payroll info", async () => {
      const mockPayrollInfo = { salary: 100000, benefits: "health" };
      fetchMock.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockPayrollInfo),
      });

      await fooBarBaz.getData(); // This would be better if we could mock getData

      const payrollInfo = await fooBarBaz.getPayrollInfo();

      expect(fetch).toHaveBeenCalledWith("https://foobarbaz.com/payroll", {
        headers: { Cookie: "testCookies" },
      });
      expect(payrollInfo).toEqual(mockPayrollInfo);
    });
  });
});
