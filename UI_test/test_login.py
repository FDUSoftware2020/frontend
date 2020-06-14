from selenium import webdriver
from time import sleep
import csv
import codecs
import sys
from itertools import islice
from fsdnModule import Fsdn
from config import true_username, true_password, state_name

username_list = []
password_list = []
state_list = []

# 读入测试样例
data = csv.reader(codecs.open("login_case.csv", 'r', 'utf_8_sig'))

for line in islice(data, 1, None):
    username_list.append(line[0])
    password_list.append(line[1])
    if line[2] == "Yes":
        state_list.append(True)
    else:
        state_list.append(False)

# 逐一执行测试样例
for i in range(len(username_list)):
    username = username_list[i]
    password = password_list[i]
    state = state_list[i]

    driver = webdriver.Chrome()
    driver.get("http://182.92.131.202")
    fsdn = Fsdn(driver)
    print("\nTest %d start:\nusername: %s\npassword: %s\nstate: %s" 
            % (i+1, username, password, state_name[int(state)]))
    try:
        if state:
            driver.find_element_by_name("login_btn").click()
            sleep(1)
            fsdn.login(true_username, true_password, prelogin=True)
            sleep(2)
            driver.get("http://182.92.131.202/sign.html")
        else:
            driver.find_element_by_name("login_btn").click()
        sleep(1)
        fsdn.login(username, password)
        sleep(1)
        fsdn.logout()
        sleep(1)
    except:
        print(sys.exc_info())
    driver.quit()
    sleep(1)

