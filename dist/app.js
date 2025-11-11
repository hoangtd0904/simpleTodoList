import { getElement } from './helpers.js';
// TODO: modify this function
const onAddTaskItem = () => {
    // get template
    const taskTemplate = getElement('#templateTask');
    const clone = taskTemplate === null || taskTemplate === void 0 ? void 0 : taskTemplate.content.cloneNode(true);
    const taskList = getElement('#taskList');
    console.log('taskList', { clone, nodeType: clone === null || clone === void 0 ? void 0 : clone.nodeType });
    if (taskList && clone)
        taskList.insertBefore(clone, taskList.childNodes[taskList.childNodes.length - 2]);
};
