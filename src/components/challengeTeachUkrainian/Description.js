import React from 'react'
import { Link } from "react-router-dom";
import { Button } from "antd";
import FacebookOutlined from "@ant-design/icons/lib/icons/FacebookOutlined";
import YoutubeOutlined from "@ant-design/icons/lib/icons/YoutubeOutlined";
import InstagramOutlined from "@ant-design/icons/lib/icons/InstagramOutlined";
import MailOutlined from "@ant-design/icons/lib/icons/MailOutlined";

const Description = () => {
    return (
 <div>
            <div className="social-info">
                <div className="social-media">
                    <span className="text">Наші контакти</span>
                    <div className="links">
                        <a target="_blank" href="https://www.facebook.com/teach.in.ukrainian"><FacebookOutlined
                            className="icon"/></a>
                        <a target="_blank"
                           href="https://www.youtube.com/channel/UCP38C0jxC8aNbW34eBoQKJw"><YoutubeOutlined
                            className="icon"/></a>
                        <a target="_blank" href="https://www.instagram.com/yedyni.ruh/"><InstagramOutlined
                            className="icon"/></a>
                        <a target="_blank" href="mailto:teach.in.ukrainian@gmail.com"><MailOutlined className="icon"/></a>
                    </div>
                </div>
                <div className="help-button">
                    <a target="blank"
                       href="https://secure.wayforpay.com/payment/s0f2891d77061">
                        <Button className="flooded-button donate-button">
                            Допомогти проєкту
                        </Button>
                    </a>
                </div>
            </div>

            <div className="marathon-description">
                <div className="title">Програма челенджу «Навчай українською»</div>
                <div className="text">
                    <b>&emsp;&emsp;Проблематика та мета проєкту:</b>
                    <br></br>
                    Вільне володіння державною мовою – одна з ключових компетентностей, якою мають оволодіти школярі. Для того, щоб діти добре знали українську – викладання у закладах позашкільної освіти, гуртках та секціях має вестися державною мовою.
                    <p>Онлайн-курс «Челендж “Навчай українською”» має на меті допомогти викладачам закладів позашкільної освіти, гуртків, тренерам спортивних секцій підвищити мотивацію, поліпшити навички викладання українською мовою та ознайомити із ресурсами, які можна використовувати під час викладання.</p>

                    <br></br>
                    <b>&emsp;&emsp;Програма дає можливість учасникам:</b>
                    <ul style={{listStyleType: 'disc', marginLeft: '12.5px'}}>
                        <li><span>опанувати мовні практики, що допомагають перейти на українську мову викладання у російськомовному середовищі;</span></li>
                        <li><span>тренувати вимову та практикувати мовлення самостійно під час вебінарів та у групах із колегами;</span></li>
                        <li><span>вивчити техніки запам’ятовування слів українською;</span></li>
                        <li><span>ознайомитися з методами впровадження української мови на заняттях позашкілля;</span></li>
                        <li><span>здолати мовні бар’єри та виробити мовну стійкість у робочому та повсякденному спілкуванні;</span></li>
                        <li><span>здобути необхідну базу в термінології українською мовою для тієї галузі, в якій працюють викладачі;</span></li>
                        <li><span>взяти участь у практичному занятті, де у малих групах з колегами виробити навичку говоріння та ведення заняття українською, визначення помилок у мовленні та опрацювання їх;</span></li>
                        <li><span>застосовувати отримані знання під час проведення уроків, тренувань та подій з учнями;</span></li>
                        <li><span>опрацювати довідкові, фахові, консультативні ресурси, якими викладачі можуть користуватися під час підготовки до занять українською мовою;</span></li>
                        <li><span>створити середовище підтримки та обміну досвідом із колегами-викладачами, які формують позашкільне дозвілля дітей, для взаємної підтримки у переході на українську та обміну професійним досвідом.</span></li>
                    </ul>

                    <br></br>
                    <b>&emsp;&emsp;Для кого цей курс?</b>
                    <br></br>
                    <p>Курс розрахований на викладачів закладів позашкільної освіти, гуртків, на тренерів спортивних секцій</p>

                    <br></br>
                    <b>&emsp;&emsp;Структура та тривалість курсу:</b>
                    <br></br>
                    <p>Челендж триває 21 день. Щодня учасники отримують навчальні матеріали та завдання по темі дня. Учасники мають можливість відвідати сім вебінарів, які стосуються мотивації та покращення навичок спілкування українською мовою, а також взяти участь у практикумі з української мови, попрацювати у групі та отримати зворотний зв’язок від викладача української мови.</p>

                    <br></br>
                    <b>&emsp;&emsp;Тематичний план:</b>
                    <br></br>
                    <ol style={{listStyleType: 'decimal', marginLeft: '12.5px'}}>
                        <li><spa>Мотивація</spa></li>
                        <li><spa>Українська музика</spa></li>
                        <li><spa>Знайомство</spa></li>
                        <li><spa>Помилки</spa></li>
                        <li><spa>День української писемності та мови</spa></li>
                        <li><spa>Запам’ятовуємо українською</spa></li>
                        <li><spa>Підтримка</spa></li>
                        <li><spa>Мовлення</spa></li>
                        <li><spa>Мотивація</spa></li>
                        <li><spa>Українські фільми для дітей і дорослих</spa></li>
                        <li><spa>Ігри українською</spa></li>
                        <li><spa>Мовна практика</spa></li>
                        <li><spa>Мовна стійкість</spa></li>
                        <li><spa>Помічники</spa></li>
                        <li><spa>Долаємо мовний бар’єр</spa></li>
                        <li><spa>Український Youtube</spa></li>
                        <li><spa>Працюємо з дітьми</spa></li>
                        <li><spa>Натхнення</spa></li>
                        <li><spa>Читаємо українською</spa></li>
                        <li><spa>Корисне з челенджу</spa></li>
                        <li><spa>Відчуйте себе переможцями</spa></li>
                    </ol>

                    <br></br>
                    <b>&emsp;&emsp;Обсяг програми:</b>
                    <p>30 годин (1 кредит ЄКТС).</p>

                    <br></br>
                    <b>&emsp;&emsp;Форма навчання:</b>
                    <p>Дистанційна (Zoom, онлайн-трансляції та самостійне виконання завдань).</p>

                    <br></br>
                    <b>&emsp;&emsp;Вартість:</b>
                    <p>Курс безкоштовний.</p>

                    <br></br>
                    <b>&emsp;&emsp;Викладачі:</b>
                    <br></br>
                    <span><b><i>Богдан Анатолійович Виноградський</i></b> – доктор наук, професор, майстер спорту (Львівський державний університет фізичної культури імені Івана Боберського). Автор наукових досліджень із проблем спортивної термінології.</span>
                    <br></br>
                    <span><b><i>Оксана Ярославівна Борис</i></b> – керівник редакційно-видавничого відділу (Львівський державний університет фізичної культури імені Івана Боберського). У минулому – лектор української мови Університету Етвеша Лоранда (Будапешт, Угорщина).</span>
                    <br></br>
                    <span><b><i>Ольга Андрусенко</i></b> – мовний коуч, викладачка української мови, редакторка освітніх видань, психологиня. Співавторка програм курсів української мов. Координаторка та викладачка всеукраїнського проєкту «Безкоштовні курси української мови в Києві» та «Є-мова». Менеджерка розвитку лідерства, тьюторка програми «Навчай для України».</span>
                    <br></br>
                    <span><b><i>Ольга Кухарук</i></b> – психотерапевтка, кандидатка психологічних наук, наукова співробітниця Інституту соціальної та політичної психології.</span>
                    <br></br>
                    <span><b><i>Наталія Вуйтік</i></b> – викладачка української мови, вчителька «Всеукраїнської школи онлайн», перекладачка.</span>
                    <br></br>
                    <span><b><i>Ірина Кметь</i></b> – філологиня, кандидат філологічних наук, доцент кафедри українського прикладного мовознавства Львівського національного університету імені Івана Франка.</span>
                    <br></br>
                    <span><b><i>Любов Базь</i></b> – філологиня, випускниця Києво-Могилянської академії, викладачка просвітницьких лекцій з української мови та літератури, письменниця, редакторка.</span>
                    <br></br>
                    <span><b><i>Мирослава Ільтьо</i></b> – викладачка української мови, журналістка, редакторка.</span>
                    <br></br>
                    <span><b><i>Олександр Жуган</i></b> – викладач акторської майстерності та сценічного мовлення. За освітою практичний психолог. Працює в дитячій театральній студії «Чорний Квадратик», студії «Ейфорія», театрі “Theat.Error”.</span>
                    <br></br>
                    <span><b><i>Мар’яна Лелик</i></b> – письменниця, літературна редакторка, тренерка з ейдетики та мнемотехніки.</span>
                    <br></br>
                    <span><b><i>Вікторія Таніч</i></b> – заступниця директора найбільшого закладу позашкільної освіти в Україні ДЮЦ «Штурм», переможця Всеукраїнського та міжнародного проєкту «Дистанційна робота. Заклади позашкілля», переможця проєкту «Найкращі практики молодіжної роботи».</span>
                    <br></br>
                    <span><b><i>Ірина Бодрик</i></b> – засновниця і керівниця студії танцю «Несамовиті», хореографиня, танцівниця, учасниця української танцювальної компанії Totem Dance Group.</span>

                    <br></br>

                    <br></br>
                    <b>&emsp;&emsp;Про організаторів:</b>
                    <p>Ініціатива «Викладай українською» – це небайдужі громадяни, батьки та волонтери, які об’єдналися навколо популяризації української мови в освіті. Серед організаторів: Українська гуманітарна платформа, Портал мовної політики.</p>

                    <br></br>
                    <b>&emsp;&emsp;Команда ініціативи «Навчай українською»:</b>
                    <br></br>
                    <span><b>Наталка Федечко</b> – засновниця проєкту, координаторка челенджу «Навчай українською».</span>
                    <br></br>
                    <span><b>Іванна Кобєлєва</b> – комунікаційна менеджерка ініціативи «Навчай українською», координаторка програми челенджу.</span>
                    <br></br>
                    <span><b>Юрій Гончаренко</b> – технічне забезпечення трансляцій, волонтер.</span>
                    <br></br>
                    <span><b>Софія Денисюк</b> – волонтерка челенджу «Навчай українською».</span>
                    
                    <br></br>
                    <br></br>
                    <br></br>

                    <table className="hardcoded-table">
                        <tbody>
                        <tr>
                            <td colSpan={2} >
                                І захід 05 – 16 листопада 2021 року <em>(мотиваційний тиждень)</em> <em>(онлайн)</em><br></br>
                            </td>
                        </tr>
                        <tr>
                            <td >
                                5 листопада<br></br>
                                13.00 – 14.00<br></br>
                            </td>
                            <td >
                                Вебінар 1. <strong>«Як почати навчати? Перші кроки до української мови викладання»</strong>. (лекцію веде один викладач).&nbsp;<br></br>
                                Спікерка – викладачка української мови, перекладачка, редакторка Наталя Вуйтік.<br></br>
                                <a href="https://youtu.be/JMAF_pSOBws">https://youtu.be/JMAF_pSOBws</a>&nbsp;<br></br>
                            </td>
                        </tr>
                        <tr>
                            <td >
                                6 листопада<br></br>
                                14.00 – 15.00<br></br>
                            </td>
                            <td >
                                Вебінар 2. <strong>«Хореографія українською»</strong> (лекцію веде один викладач). Спікерка – хореографиня, танцівниця, засновниця та керівниця студії танцю «Несамовиті» Іра Бодрик<br></br>
                                <a href="https://youtu.be/9C3CVLp-g9s">https://youtu.be/9C3CVLp-g9s</a>&nbsp;<br></br>
                            </td>
                        </tr>
                        <tr>
                            <td >
                                8 листопада 11.00 – 12.00<br></br>
                            </td>
                            <td >
                                Вебінар 3. <strong>«Психологічна підтримка зміни мови</strong>. Чому не варто боятися помилок у мовленні? Що робити, якщо ви зіткнулись з агресією, якщо до вас ставляться вороже через українську?» (лекцію веде один викладач). Спікерка – психотерапевтка, кандидатка психологічних наук, наукова співробітниця Інституту соціальної та політичної психології Ольга Кухарук <a href="https://youtu.be/YbYaMylxM8c">https://youtu.be/YbYaMylxM8c</a><br></br>
                            </td>
                        </tr>
                        <tr>
                            <td >
                                9 листопада<br></br>
                                12.00 – 13.00<br></br>
                            </td>
                            <td >
                                Публічний захід до Дня української мови та писемності: <strong>«Українська. Історія зірок»</strong>. Серія мотиваційних промов відомих публічних людей України (1 год). &nbsp;<a href="https://youtu.be/rohS9RnYrxQ">https://youtu.be/rohS9RnYrxQ</a>&nbsp;&nbsp;<br></br>
                            </td>
                        </tr>
                        <tr>
                            <td >
                                10 листопада<br></br>
                                10.00 – 11.00<br></br>
                            </td>
                            <td >
                                Вебінар 4<strong>. «Запам'ятовувати легко: українська мова + ейдетика та мнемотехніка»</strong> (лекцію веде один викладач).&nbsp;<br></br>
                                &nbsp;Спікерка – письменниця, літературна редакторка, тренерка з ейдетики та мнемотехніки Мар’яна Лелик.<br></br>
                                <a href="https://youtu.be/o_2rAf5M1w0">https://youtu.be/o_2rAf5M1w0</a>&nbsp;<br></br>
                            </td>
                        </tr>
                        <tr>
                            <td >
                                11 листопада<br></br>
                                11.00 – 12.00<br></br>
                            </td>
                            <td >
                                Вебінар 5. <strong>«До Олімпу через українське слово»</strong>. 1.Типи спортивної термінології (наукова, практична, сленг).<br></br>
                                2. Словники спортивних термінів: стан і перспективи.&nbsp;<br></br>
                                3. Мовні казуси використання термінів у різних видах спорту. (лекцію ведуть два викладачі).<br></br>
                                Спікери: &nbsp;<br></br>
                                Богдан Анатолійович Виноградський – доктор наук, професор, майстер спорту (Львівський державний університет фізичної культури імені Івана Боберського). Автор наукових досліджень із проблем спортивної термінології.<br></br>
                                Оксана Ярославівна Борис – керівник редакційно-видавничого відділу (Львівський державний університет фізичної культури імені Івана Боберського). У минулому – лектор української мови Університету Етвеша Лоранда (Будапешт, Угорщина).<br></br>
                                <a href="https://youtu.be/5-w8dD-JXgk">https://youtu.be/5-w8dD-JXgk</a>&nbsp;<br></br>
                            </td>
                        </tr>
                        <tr>
                            <td >
                                12 листопада<br></br>
                                11.00 – 12.00<br></br>
                            </td>
                            <td >
                                Вебінар 6. <strong>«Голос і мовлення»</strong> (лекцію веде один викладач).<br></br>
                                Спікер – Олександр Жуган<br></br>
                                <a href="https://youtu.be/-QRBoDNdRp8">https://youtu.be/-QRBoDNdRp8</a>&nbsp;<br></br>
                            </td>
                        </tr>
                        <tr>
                            <td >
                                15 листопада<br></br>
                                9.00 – 10.00<br></br>
                                10.30 – 11.30<br></br>
                            </td>
                            <td >
                                Практикуми 1-2 (у практикумі задіяні одночасно 3 викладачі, підготовка та тривалість кожного практикуму 3 години).<br></br>
                            </td>
                        </tr>
                        <tr>
                            <td >
                                16 листопада<br></br>
                                9.00 – 10.00<br></br>
                                10.30 – 11.30<br></br>
                                12.00 – 13.00<br></br>
                            </td>
                            <td >
                                Практикуми 3-5 (у практикумі задіяні одночасно 3 викладачі, підготовка та тривалість кожного практикуму 3 години).<br></br>
                            </td>
                        </tr>
                        <tr>
                            <td >
                                17 листопада<br></br>
                                9.00 – 10.00<br></br>
                                10.30 – 11.30<br></br>
                            </td>
                            <td >
                                Практикуми 6-7 (у практикумі задіяні одночасно 3 викладачі, підготовка та тривалість кожного практикуму 3 години)<br></br>
                            </td>
                        </tr>
                        <tr>
                            <td >
                                18 листопада<br></br>
                                9.00 – 10.00<br></br>
                                10.30 – 11.30<br></br>
                                12.00 – 13.00<br></br>
                            </td>
                            <td >
                                Практикуми 8-10 (одночасно у практикумі задіяні 3 викладачі)<br></br>
                            </td>
                        </tr>
                        <tr>
                            <td >
                                19 листопада 11.00 – 12.00<br></br>
                            </td>
                            <td >
                                Вебінар 7. <strong>«Як перейти на українську всім колективом?»</strong> (лекцію веде один викладач). Спікери – команда Дитячо-юнацького центру «Штурм» (м. Дніпро) – найбільшого закладу позашкільної освіти в Україні, переможця Всеукраїнського та міжнародного проєкту «Дистанційна робота. Заклади позашкілля», переможця проєкту «Найкращі практики молодіжної роботи».<br></br>
                                <a href="https://youtu.be/RLrmhYv-GSA">https://youtu.be/RLrmhYv-GSA</a><br></br>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
 </div>

    )
}

export default Description;
