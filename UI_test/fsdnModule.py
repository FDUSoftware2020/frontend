from selenium import webdriver
from time import sleep
import sys

# 预先定义的页面对象, 封装了各种页面操作
class Fsdn:
    def __init__(self, driver):
        super().__init__()
        self.driver = driver
    
    def login(self, username, password, prelogin=False):
        # 预先进入登录页面
        self.driver.find_element_by_name("username_input").clear()
        self.driver.find_element_by_name("username_input").send_keys(username)
        self.driver.find_element_by_name("password_input").clear()
        self.driver.find_element_by_name("password_input").send_keys(password)
        sleep(1)
        self.driver.find_element_by_name("sign_btn").click()
        sleep(2)
        alert_wd = self.driver.switch_to.alert
        sleep(1)
        if not prelogin:
            print("登录弹窗内容:\n%s" % alert_wd.text)
            assert username in alert_wd.text, '登录失败！'
        alert_wd.accept()

    def logout(self):
        self.driver.find_element_by_name("user_btn").click()
        self.driver.find_element_by_name("logout_btn").click()
    
    def commentOnArticle(self, content):
        # 要求预先跳转到文章页面
        self.driver.find_element_by_id("input-28").clear()
        self.driver.find_element_by_id("input-28").send_keys(content)
        sleep(1)
        self.driver.find_element_by_name("pub_btn").click()
        sleep(1)
        alert_text = ""
        try:
            alert_wd = self.driver.switch_to.alert
            print("评论弹窗内容:\n%s" % alert_wd.text)
            alert_text = alert_wd.text
        except:
            print(sys.exc_info())
        assert "回复成功" in alert_text, '评论失败'
        sleep(1)
        alert_wd.accept()
