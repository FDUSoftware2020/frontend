from selenium import webdriver
from time import sleep
import csv
import codecs
import sys
from itertools import islice
from fsdnModule import Fsdn
from config import true_username, true_password, state_name

state_list = []
content_list = []

# 读入测试样例
data = csv.reader(codecs.open("comment_case.csv", 'r', 'utf_8_sig'))

for line in islice(data, 1, None):
    if line[0] == "Yes":
        state_list.append(True)
    else:
        state_list.append(False)
    content_list.append(line[1])

# 逐一执行测试样例
for i in range(len(state_list)):
    state = state_list[i]
    content = content_list[i]

    driver = webdriver.Chrome()
    driver.get("http://182.92.131.202")
    fsdn = Fsdn(driver)
    print("\nTest %d start:\nstate: %s\ncontent: %s" 
            % (i+1, state_name[int(state)], content))
    try:
        if state:
            driver.find_element_by_name("login_btn").click()
            sleep(1)
            fsdn.login(true_username, true_password, prelogin=True)
            sleep(2)
        driver.get("http://182.92.131.202/article.html?article_id=13")
        sleep(1)
        fsdn.commentOnArticle(content)
        sleep(1)
    except:
        print(sys.exc_info())
    driver.quit()
    sleep(1)

