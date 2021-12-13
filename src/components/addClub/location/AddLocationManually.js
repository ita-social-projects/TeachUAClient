// import {Button, Form, Input, Select, Tooltip} from "antd";
// import InfoCircleOutlined from "@ant-design/icons/lib/icons/InfoCircleOutlined";
// import React from "react";
//
// const AddLocationManually = () => {
//
//     return (
//         <Form
//             requiredMark={false}
//             className="add-club-content"
//             form={form}
//             onFinish={onFinish}
//             onChange={onChange}
//         >
//             <Form.Item name="name"
//                        className="add-club-row"
//                        label="Назва"
//                        hasFeedback
//                        rules={[
//                            {
//                                required: true,
//                                pattern: /^(?!\s)([\wА-ЩЬЮЯҐЄІЇа-щьюяґєії !"#$%&'()*+,\-.\/:;<=>?@[\]^_`{}~]){5,100}$/,
//                                message: "Некоректна назва локації",
//                            }]}
//             >
//                 <Input className="add-club-input"
//                        suffix={
//                            <Tooltip placement="bottomRight"
//                                     title="Це поле може містити українські та англійські символи довжиною від 5-100. також цифри і спец.символи (!#$%&'()*+,-./:;<=>?@[]^_`{}~)">
//                                <InfoCircleOutlined className="info-icon" />
//                            </Tooltip>
//                        }
//                        placeholder="Назва локації" />
//             </Form.Item>
//             <div className="add-club-inline">
//                 <Form.Item name="cityName"
//                            className="add-club-row"
//                            label="Місто"
//                            initialValue={editedLocation && editedLocation.cityName}
//                            hasFeedback
//                            rules={[{
//                                required: true,
//                                message: "Це поле є обов'язковим"
//                            }]}>
//                     <Select
//                         onClick={onChange}
//                         className="add-club-select"
//                         placeholder="Виберіть місто"
//                         onChange={(value) => {
//                             if (cityName) {
//                                 cityOnInput === value ?
//                                     setInputAddressProps({validateStatus: 'success'}) :
//                                     setInputAddressProps({validateStatus: 'error'});
//                             }
//                             changeCity();
//                             setCityName(value);
//                         }}
//                         optionFilterProp="children">
//                         {cities.map(city => <Option
//                             value={city.name}>{city.name}</Option>)}
//                     </Select>
//                 </Form.Item>
//                 <Form.Item name="districtName"
//                            className="add-club-row"
//                            label="Район міста"
//                            hasFeedback
//                     // rules={[{
//                     //     required: true,
//                     //     message: "Це поле є обов'язковим"
//                     // }]}
//                 >
//                     <Select
//                         className="add-club-select"
//                         placeholder="Виберіть район"
//                         optionFilterProp="children">
//                         {districts.map(district => <Option value={district.name}>{district.name}</Option>)}
//                     </Select>
//                 </Form.Item>
//                 <Form.Item name="stationName"
//                            className="add-club-row"
//                            label="Метро/Місцевість"
//                            hasFeedback
//                     // rules={[{
//                     //     required: true,
//                     //     message: "Це поле є обов'язковим"
//                     // }]}
//                 >
//                     <Select
//                         className="add-club-select"
//                         placeholder="Виберіть місцевість"
//                         optionFilterProp="children">
//                         {station.map(station => <Option value={station.name}>{station.name}</Option>)}
//                     </Select>
//                 </Form.Item>
//             </div>
//
//             <Form.Item name="address"
//                        className="add-club-row"
//                        label="Адреса"
//                        hasFeedback
//                        rules={[{
//                            required: true,
//                            message: "Це поле є обов'язковим"
//                        },{
//                            required: true,
//                            pattern: /^(?!\s)([\wА-ЩЬЮЯҐЄІЇа-щьюяґєії !"#$%&'()*+,\-.\/:;<=>?@[\]^_`{}~]){5,100}$/,
//                            message: "Некоректна адреса",
//                        }]}>
//                 <Input className="add-club-input"
//                        placeholder="Адреса"
//                 />
//                 {/*<AddClubInputAddress*/}
//                 {/*    editedLocation={editedLocation}*/}
//                 {/*    form={form}*/}
//                 {/*    setCityName={setCityName}*/}
//                 {/*    onChange={handleSelect}/>*/}
//             </Form.Item>
//             <div className="add-club-inline">
//                 <Form.Item name="coordinates"
//                            className="add-club-row"
//                            label="Географічні координати"
//                            hasFeedback
//                            rules={[{
//                                required: true,
//                                message: "Некоректні координати",
//                                pattern: /([0-9]+\.[0-9]+), ([0-9]+\.[0-9]+)/
//                            },{
//                                message:"Координати не можуть містити букви",
//                                pattern:/^[^A-Za-zА-Яа-яІіЇїЄєҐґ]*$/
//                            }
//                            ]}>
//                     <Input className="add-club-input add-club-select"
//                            value={coordinates}
//                            onInput={e => setCoordinates(e.target.value) }
//
//                         // suffix={
//                         //     <Tooltip title="Буде автоматично заповнено при введені адреси">
//                         //         <InfoCircleOutlined className="info-icon"/>
//                         //     </Tooltip>
//                         // }
//                            placeholder="Широта та довгота"/>
//                 </Form.Item>
//             </div>
//             <Form.Item name="phone"
//                        className="add-club-row"
//                        label="Номер телефону"
//                        hasFeedback
//                        rules={[
//                            {
//                                required: true,
//                                message: "Це поле є обов'язковим"
//                            },
//                            {
//                                required: false,
//                                pattern: /^\d{9}$/,
//                                message: "Телефон не відповідає вказаному формату"
//                            },
//                            // {
//                            //     required: false,
//                            //     pattern: /^[^A-Za-zА-Яа-яІіЇїЄєҐґ]*$/,
//                            //     message: "Телефон не може містити літери"
//                            // },
//                            // {
//                            //     required: false,
//                            //     pattern: /^[^-`~!@#$%^&*()/_+={}\[\]|\\:;“"’'<,>.?๐฿]*$/,
//                            //     message: "Телефон не може містити спеціальні символи"
//                            // },
//                            // {
//                            //     required: false,
//                            //     pattern: /^[^\s]*$/,
//                            //     message: "Телефон не може містити пробільні символи"
//                            // }
//                        ]}>
//                 <Input className="add-club-input"
//                        prefix='+380'
//                        suffix={
//                            <Tooltip placement="topRight"
//                                     title="Телефон не може містити літери, спеціальні символи та пробіли">
//                                <InfoCircleOutlined className="info-icon" />
//                            </Tooltip>
//                        }
//                        placeholder="___________"/>
//             </Form.Item>
//
//             <div className="add-club-content-footer add-club-add-location-button">
//                 {
//                     !isDisabled ?
//                         <Button htmlType="submit"
//                                 className="flooded-button add-club-content-next">Додати</Button> :
//                         <Button disabled={isDisabled} htmlType="submit"
//                                 className="flooded-button add-club-content-next-disabled">Додати</Button>
//                 }
//             </div>
//         </Form>
//     )
// };
//
// export default AddLocationManually;
// import {Button, Form, Input, Select, Tooltip} from "antd";
// import InfoCircleOutlined from "@ant-design/icons/lib/icons/InfoCircleOutlined";
// import React from "react";
//
// const AddLocationManually = () => {
//
//     return (
//         <Form
//             requiredMark={false}
//             className="add-club-content"
//             form={form}
//             onFinish={onFinish}
//             onChange={onChange}
//         >
//             <Form.Item name="name"
//                        className="add-club-row"
//                        label="Назва"
//                        hasFeedback
//                        rules={[
//                            {
//                                required: true,
//                                pattern: /^(?!\s)([\wА-ЩЬЮЯҐЄІЇа-щьюяґєії !"#$%&'()*+,\-.\/:;<=>?@[\]^_`{}~]){5,100}$/,
//                                message: "Некоректна назва локації",
//                            }]}
//             >
//                 <Input className="add-club-input"
//                        suffix={
//                            <Tooltip placement="bottomRight"
//                                     title="Це поле може містити українські та англійські символи довжиною від 5-100. також цифри і спец.символи (!#$%&'()*+,-./:;<=>?@[]^_`{}~)">
//                                <InfoCircleOutlined className="info-icon" />
//                            </Tooltip>
//                        }
//                        placeholder="Назва локації" />
//             </Form.Item>
//             <div className="add-club-inline">
//                 <Form.Item name="cityName"
//                            className="add-club-row"
//                            label="Місто"
//                            initialValue={editedLocation && editedLocation.cityName}
//                            hasFeedback
//                            rules={[{
//                                required: true,
//                                message: "Це поле є обов'язковим"
//                            }]}>
//                     <Select
//                         onClick={onChange}
//                         className="add-club-select"
//                         placeholder="Виберіть місто"
//                         onChange={(value) => {
//                             if (cityName) {
//                                 cityOnInput === value ?
//                                     setInputAddressProps({validateStatus: 'success'}) :
//                                     setInputAddressProps({validateStatus: 'error'});
//                             }
//                             changeCity();
//                             setCityName(value);
//                         }}
//                         optionFilterProp="children">
//                         {cities.map(city => <Option
//                             value={city.name}>{city.name}</Option>)}
//                     </Select>
//                 </Form.Item>
//                 <Form.Item name="districtName"
//                            className="add-club-row"
//                            label="Район міста"
//                            hasFeedback
//                     // rules={[{
//                     //     required: true,
//                     //     message: "Це поле є обов'язковим"
//                     // }]}
//                 >
//                     <Select
//                         className="add-club-select"
//                         placeholder="Виберіть район"
//                         optionFilterProp="children">
//                         {districts.map(district => <Option value={district.name}>{district.name}</Option>)}
//                     </Select>
//                 </Form.Item>
//                 <Form.Item name="stationName"
//                            className="add-club-row"
//                            label="Метро/Місцевість"
//                            hasFeedback
//                     // rules={[{
//                     //     required: true,
//                     //     message: "Це поле є обов'язковим"
//                     // }]}
//                 >
//                     <Select
//                         className="add-club-select"
//                         placeholder="Виберіть місцевість"
//                         optionFilterProp="children">
//                         {station.map(station => <Option value={station.name}>{station.name}</Option>)}
//                     </Select>
//                 </Form.Item>
//             </div>
//
//             <Form.Item name="address"
//                        className="add-club-row"
//                        label="Адреса"
//                        hasFeedback
//                        rules={[{
//                            required: true,
//                            message: "Це поле є обов'язковим"
//                        },{
//                            required: true,
//                            pattern: /^(?!\s)([\wА-ЩЬЮЯҐЄІЇа-щьюяґєії !"#$%&'()*+,\-.\/:;<=>?@[\]^_`{}~]){5,100}$/,
//                            message: "Некоректна адреса",
//                        }]}>
//                 <Input className="add-club-input"
//                        placeholder="Адреса"
//                 />
//                 {/*<AddClubInputAddress*/}
//                 {/*    editedLocation={editedLocation}*/}
//                 {/*    form={form}*/}
//                 {/*    setCityName={setCityName}*/}
//                 {/*    onChange={handleSelect}/>*/}
//             </Form.Item>
//             <div className="add-club-inline">
//                 <Form.Item name="coordinates"
//                            className="add-club-row"
//                            label="Географічні координати"
//                            hasFeedback
//                            rules={[{
//                                required: true,
//                                message: "Некоректні координати",
//                                pattern: /([0-9]+\.[0-9]+), ([0-9]+\.[0-9]+)/
//                            },{
//                                message:"Координати не можуть містити букви",
//                                pattern:/^[^A-Za-zА-Яа-яІіЇїЄєҐґ]*$/
//                            }
//                            ]}>
//                     <Input className="add-club-input add-club-select"
//                            value={coordinates}
//                            onInput={e => setCoordinates(e.target.value) }
//
//                         // suffix={
//                         //     <Tooltip title="Буде автоматично заповнено при введені адреси">
//                         //         <InfoCircleOutlined className="info-icon"/>
//                         //     </Tooltip>
//                         // }
//                            placeholder="Широта та довгота"/>
//                 </Form.Item>
//             </div>
//             <Form.Item name="phone"
//                        className="add-club-row"
//                        label="Номер телефону"
//                        hasFeedback
//                        rules={[
//                            {
//                                required: true,
//                                message: "Це поле є обов'язковим"
//                            },
//                            {
//                                required: false,
//                                pattern: /^\d{9}$/,
//                                message: "Телефон не відповідає вказаному формату"
//                            },
//                            // {
//                            //     required: false,
//                            //     pattern: /^[^A-Za-zА-Яа-яІіЇїЄєҐґ]*$/,
//                            //     message: "Телефон не може містити літери"
//                            // },
//                            // {
//                            //     required: false,
//                            //     pattern: /^[^-`~!@#$%^&*()/_+={}\[\]|\\:;“"’'<,>.?๐฿]*$/,
//                            //     message: "Телефон не може містити спеціальні символи"
//                            // },
//                            // {
//                            //     required: false,
//                            //     pattern: /^[^\s]*$/,
//                            //     message: "Телефон не може містити пробільні символи"
//                            // }
//                        ]}>
//                 <Input className="add-club-input"
//                        prefix='+380'
//                        suffix={
//                            <Tooltip placement="topRight"
//                                     title="Телефон не може містити літери, спеціальні символи та пробіли">
//                                <InfoCircleOutlined className="info-icon" />
//                            </Tooltip>
//                        }
//                        placeholder="___________"/>
//             </Form.Item>
//
//             <div className="add-club-content-footer add-club-add-location-button">
//                 {
//                     !isDisabled ?
//                         <Button htmlType="submit"
//                                 className="flooded-button add-club-content-next">Додати</Button> :
//                         <Button disabled={isDisabled} htmlType="submit"
//                                 className="flooded-button add-club-content-next-disabled">Додати</Button>
//                 }
//             </div>
//         </Form>
//     )
// };
//
// export default AddLocationManually;
